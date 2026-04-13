import React from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import { ProductTable } from "../component/ProductTable";
import Filter from "../assets/admin/filter.svg";
import Search from "../assets/admin/Search.svg";
import AdminModal from "../component/AdminModal";
import ProductSidebar from "../component/ProductSidebar";
import VariantSidebar from "../component/VariantSidebar";
import { useEffect, useState } from "react";
import http from "../lib/http";

export default function ListProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    title: "Add Product",
    action: "AddProduct",
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
          sizeOptions: product.sizes.map((size) => size.name).join(", "),
          variantOptions: product.variants
            .map((variant) => variant.name)
            .join(", "),
          payment: "Dine In, Deliver",
        };
      });
      setProducts(mapped);
    };
    fetchProductsFromAPI();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenAddProductModal = () => {
    setSelectedProduct(null);
    setModalConfig({ title: "Add Product", action: "AddProduct" });
    setIsModalOpen(true);
  };

  const handleOpenAddSizeModal = () => {
    setSelectedProduct(null);
    setModalConfig({ title: "Add Size", action: "AddSize" });
    setIsModalOpen(true);
  };

  const handleOpenAddVariantModal = () => {
    setSelectedProduct(null);
    setModalConfig({ title: "Add Variant", action: "AddVariant" });
    setIsModalOpen(true);
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

  const renderModalContent = () => {
    switch (modalConfig.action) {
      case "AddProduct":
      case "Edit":
      case "View":
        return (
          <ProductSidebar
            onClose={handleCloseModal}
            title={modalConfig.title}
            action={modalConfig.action}
            product={selectedProduct}
            isInsert={modalConfig.action === "AddProduct"}
          />
        );
      case "AddSize":
        return (
          <VariantSidebar 
            variantType="size" 
            onClose={handleCloseModal}
            title={modalConfig.title}
          />
        );
      case "AddVariant":
        return (
          <VariantSidebar 
            variantType="variant" 
            onClose={handleCloseModal}
            title={modalConfig.title}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-row justify-between pl-7 pr-7 py-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Product List</h2>
              <div className="flex flex-row gap-3">
                <button
                  onClick={handleOpenAddProductModal}
                  className="bg-orange-400 hover:bg-orange-500 text-black px-4 py-2 rounded-lg font-medium transition"
                >
                  + Add Product
                </button>
                <button
                  onClick={handleOpenAddSizeModal}
                  className="bg-orange-400 hover:bg-orange-500 text-black px-4 py-2 rounded-lg font-medium transition"
                >
                  + Add Size
                </button>
                <button
                  onClick={handleOpenAddVariantModal}
                  className="bg-orange-400 hover:bg-orange-500 text-black px-4 py-2 rounded-lg font-medium transition"
                >
                  + Add Variant
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-2">Search Product</span>
                <div className="relative w-72">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                  <img
                    src={Search}
                    alt="Search icon"
                    className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                </div>
              </div>
              <button className="flex items-center px-4 py-2 bg-orange-400 hover:bg-orange-500 text-black rounded-lg h-10 font-medium transition">
                <img src={Filter} alt="Filter icon" className="h-5 w-5 mr-2" />
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
            {renderModalContent()}
          </AdminModal>
        </main>
      </div>
    </div>
  );
}