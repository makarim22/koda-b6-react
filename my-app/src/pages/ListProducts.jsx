import React from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import { ProductTable } from "../component/ProductTable";
import Filter from "../assets/admin/filter.svg";
import Search from "../assets/admin/Search.svg";
import AdminModal from "../component/AdminModal";
import ProductSidebar from "../component/ProductSidebar";
import { useEffect, useState } from "react";
import http from "../lib/http";

export default function ListProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [modalConfig, setModalConfig] = useState({
    title: "Add",
    action: "Add",
  });

  useEffect(() => {
    const fetchProductsFromAPI = async () => {
      const response = await http(`/api/products`, {}, { method: "GET" });
      if (!response) {
        throw new Error("gagal mengambil data produk");
      }
      const result = await response.json();
      const mapped = (result.data || []).map((product) => {
        const primaryImage =
          product.images?.find((img) => img.is_primary) || product.images?.[0];
        return {
          id: product.id,
          name: product.product_name,
          price: product.base_price.toLocaleString("id-ID"),
          description: product.description,
          stock: product.stock,
          image: primaryImage?.path || "",
          sizeOptions: "-",
          payment: "Dine In, Deliver",
        };
      });
      setProducts(mapped);
    };
    fetchProductsFromAPI();
  }, []);
  const handleOpenAddModal = () => {
    setModalConfig({ title: "Add", action: "Add" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenViewModal = (product) => {
    setSelectedProduct(product);
    setModalConfig({ title: "View Product Details", action: "View" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setModalConfig({ title: "Edit Product", action: "Edit" });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto ">
          <div className="flex flex-row justify-between pl-7 pr-7">
            <div className="flex flex-col">
              Product List
              <button
                onClick={handleOpenAddModal}
                className="bg-orange-400 text-black w-35 py-2 px-4 rounded-lg"
              >
                {" "}
                + Add Product
              </button>
            </div>
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <span>Search Product</span>
                <div class="relative w-72">
                  <input
                    type="text"
                    placeholder="Product Name"
                    class="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full" /* w-full makes input take full width of its relative parent */
                  />
                  <img
                    src={Search}
                    alt="Search icon"
                    class="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" /* Positioned the icon */
                  />
                </div>
              </div>
              <button className="flex items-center px-4 py-2 bg-orange-400 text-black rounded-lg h-10">
                <img src={Filter} alt="Filter icon" class="h-5 w-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          <ProductTable
            products={products}
            itemsPerPage={5}
            onEdit={handleOpenEditModal}
            onView={handleOpenViewModal}
          />

          <AdminModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={modalConfig.title}
            action={modalConfig.action}
          >
            <ProductSidebar
              onClose={handleCloseModal}
              title={modalConfig.title}
              action={modalConfig.action}
              product={selectedProduct}
              isInsert={modalConfig.action === "Add"}
            />
          </AdminModal>
        </main>
      </div>
    </div>
  );
}
