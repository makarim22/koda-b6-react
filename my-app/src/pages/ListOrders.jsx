import React, { useState, useMemo } from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import { OrderTable } from "../component/OrderTable";
import Filter from "../assets/admin/filter.svg";
import Search from "../assets/admin/Search.svg";
import Dropdown from "../assets/admin/dropdown.svg";
import OrderSidebar from "../component/OrderSidebar";
import AdminModal from "../component/AdminModal";
import { useFetch } from "../hooks/useFetch";

function ListOrders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalConfig, setModalConfig] = useState({
    title: "Add",
    action: "Add",
  });

  const getActiveUser = () => {
    try {
      const activeUser = JSON.parse(localStorage.getItem("currentUserSession"));
      return activeUser;
    } catch (error) {
      console.warn("tidak bisa mengambil data user", error);
      return null;
    }
  };

  const user = getActiveUser();
  const token = user?.token || user?.user?.token;

  const { data: rawOrders, isLoading, error, refetch } = useFetch("/api/admin/orders", { token });

  const orders = useMemo(() => {
    if (!rawOrders) return [];
    
    // Map data to table format
    const mapped = rawOrders.map((order) => ({
      id: order.id,
      date: order.order_date,
      status: order.status || 'Pending',
      subtotal: `Rp${order.subtotal.toLocaleString('id-ID')}`,
      cartHistory: (order.items || []).map((item) => ({
        title: item.product_name,
        quantity: item.quantity,
        size: item.size_name,
        variant: item.variant_name,
        price: item.price,
      })),
    }));

    // Apply Search Filter (Order Number)
    const searched = mapped.filter(order => 
      order.id.toString().includes(searchQuery)
    );

    // Apply Status Filter
    if (statusFilter === "All") {
      return searched;
    }
    return searched.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());
  }, [rawOrders, searchQuery, statusFilter]);

  const handleOpenAddModal = () => {
    setModalConfig({ title: "Add", action: "Add" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenViewModal = (order) => {
    setSelectedOrder(order);
    setModalConfig({ title: "View Order Details", action: "View" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (order) => {
    setSelectedOrder(order);
    setModalConfig({ title: "Edit Order", action: "Edit" });
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    // Left as-is per existing code
    try {
      const userData = JSON.parse(localStorage.getItem("user-data") || "[]");
      const filteredUsers = userData.filter((user) => user.id !== id);
      localStorage.setItem("user-data", JSON.stringify(filteredUsers));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto ">
          <div className="flex flex-row justify-between pl-7 pr-7 mt-6 mb-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Order List</h2>
              <button
                onClick={handleOpenAddModal}
                className="bg-orange-400 hover:bg-orange-500 text-black px-4 py-2 rounded-lg font-medium transition w-36"
              >
                + Add Order
              </button>
            </div>
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-2">Status</span>
                <div className="relative w-36">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full appearance-none bg-transparent"
                  >
                    <option value="All">All</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <img
                    src={Dropdown}
                    alt="Dropdown icon"
                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-2">Search Order</span>
                <div className="relative w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Order Number"
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                  <img
                    src={Search}
                    alt="Search icon"
                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>
              <button className="flex items-center px-4 py-2 bg-orange-400 hover:bg-orange-500 text-black rounded-lg h-10 font-medium transition">
                <img src={Filter} alt="Filter icon" className="h-5 w-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="px-7">
            {isLoading ? (
              <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg font-medium">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center h-64 border rounded-lg bg-red-50 text-red-700 p-4">
                <p className="font-semibold mb-2">Error loading orders</p>
                <p className="mb-4">{error}</p>
                <button 
                  onClick={refetch}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
                >
                  Retry
                </button>
              </div>
            ) : orders.length === 0 ? (
               <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg font-medium">No orders found.</p>
              </div>
            ) : (
              <OrderTable
                orders={orders}
                itemsPerPage={5}
                onEdit={handleOpenEditModal}
                onView={handleOpenViewModal}
                onDelete={handleDeleteUser}
              />
            )}
          </div>

          <AdminModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={modalConfig.title}
            action={modalConfig.action}
          >
            <OrderSidebar
              onClose={handleCloseModal}
              title={modalConfig.title}
              action={modalConfig.action}
              order={selectedOrder}
            />
          </AdminModal>
        </main>
      </div>
    </div>
  );
}

export default ListOrders;
