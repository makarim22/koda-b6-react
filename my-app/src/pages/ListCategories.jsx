import React, { useState, useMemo } from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import AdminModal from "../component/AdminModal";
import { useFetch } from "../hooks/useFetch";
import Search from "../assets/admin/Search.svg";
import http from "../lib/http";
import CategoryModal from "../component/CategoryModal";

export default function ListCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalConfig, setModalConfig] = useState({
    title: "Add Category",
    action: "AddCategory",
  });

  const { data: rawCategories, isLoading, error, refetch } = useFetch("/api/product-categories");

  const categories = useMemo(() => {
    if (!rawCategories) return [];
    if (!searchQuery) return rawCategories;

    return rawCategories.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rawCategories, searchQuery]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    refetch();
  };

  const handleOpenAddModal = () => {
    setSelectedCategory(null);
    setModalConfig({ title: "Add Category", action: "AddCategory" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category);
    setModalConfig({ title: "Edit Category", action: "EditCategory" });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      const res = await http(`/api/product-categories/${id}`, {}, { method: 'DELETE' });
      if (res.ok) {
        refetch();
      } else {
        alert("Failed to delete category");
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
              <h2 className="text-xl font-semibold text-gray-800">Category List</h2>
              <button
                onClick={handleOpenAddModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                + Add Category
              </button>
            </div>
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-2 text-gray-600">Search Category</span>
                <div className="relative w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Category Name"
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
                <p className="text-gray-500 text-lg font-medium">Loading categories...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center h-64 border rounded-lg bg-red-50 text-red-700 p-4">
                <p className="font-semibold mb-2">Error loading categories</p>
                <p className="mb-4">{error}</p>
                <button 
                  onClick={refetch}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
                >
                  Retry
                </button>
              </div>
            ) : categories.length === 0 ? (
               <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg font-medium">No categories found.</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{cat.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(cat.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleOpenEditModal(cat)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-900">
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
            <CategoryModal 
              category={selectedCategory} 
              onClose={handleCloseModal} 
              isEdit={modalConfig.action === "EditCategory"} 
            />
          </AdminModal>
        </main>
      </div>
    </div>
  );
}
