import React, { useState, useMemo } from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import AdminModal from "../component/AdminModal";
import { useFetch } from "../hooks/useFetch";
import Search from "../assets/admin/Search.svg";
import http from "../lib/http";
import VoucherModal from "../component/VoucherModal";

export default function ListVouchers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalConfig, setModalConfig] = useState({
    title: "Add Voucher",
    action: "AddVoucher",
  });

  const getActiveUser = () => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("currentUserSession"));
      return activeUser;
    } catch (error) {
      return null;
    }
  };
  const user = getActiveUser();
  const token = user?.token || user?.user?.token;

  const { data: rawVouchers, isLoading, error, refetch } = useFetch("/api/vouchers", { token });

  const vouchers = useMemo(() => {
    if (!rawVouchers) return [];
    if (!searchQuery) return rawVouchers;

    return rawVouchers.filter(v => 
      v.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rawVouchers, searchQuery]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
    refetch();
  };

  const handleOpenAddModal = () => {
    setSelectedVoucher(null);
    setModalConfig({ title: "Add Voucher", action: "AddVoucher" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (voucher) => {
    setSelectedVoucher(voucher);
    setModalConfig({ title: "Edit Voucher", action: "EditVoucher" });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this voucher?")) return;
    
    try {
      const res = await http(`/api/vouchers/${id}`, {}, { method: 'DELETE', token });
      if (res.ok) {
        refetch();
      } else {
        alert("Failed to delete voucher");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-row justify-between pl-7 pr-7 py-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Voucher List</h2>
              <button
                onClick={handleOpenAddModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                + Add Voucher
              </button>
            </div>
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-2 text-gray-600">Search Voucher</span>
                <div className="relative w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Voucher Code"
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                  <img
                    src={Search}
                    alt="Search icon"
                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-7 pb-8">
            {isLoading ? (
              <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg font-medium">Loading vouchers...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center h-64 border rounded-lg bg-red-50 text-red-700 p-4">
                <p className="font-semibold mb-2">Error loading vouchers</p>
                <p className="mb-4">{error}</p>
                <button 
                  onClick={refetch}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
                >
                  Retry
                </button>
              </div>
            ) : vouchers.length === 0 ? (
               <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg font-medium">No vouchers found.</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vouchers.map((v) => (
                      <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{v.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {v.discount_type === 'PERCENTAGE' ? `${v.discount_value}%` : `Rp ${v.discount_value.toLocaleString()}`}
                          <div className="text-xs text-gray-500">Min Purchase: Rp {v.min_purchase.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-xs">From: {new Date(v.valid_from).toLocaleDateString()}</div>
                          <div className="text-xs">Until: {new Date(v.valid_until).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           {v.used_count} / {v.usage_limit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleOpenEditModal(v)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(v.id)} className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <AdminModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={modalConfig.title}
            action={modalConfig.action}
          >
            <VoucherModal 
              voucher={selectedVoucher} 
              onClose={handleCloseModal} 
              isEdit={modalConfig.action === "EditVoucher"} 
              token={token}
            />
          </AdminModal>
        </main>
      </div>
    </div>
  );
}
