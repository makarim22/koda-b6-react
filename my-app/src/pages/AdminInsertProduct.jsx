import React from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import { ProductTable } from "../component/ProductTable";
import ProductSidebar from "../component/ProductSidebar";

function AdminInsertProduct() {
  const Products = [
    {
      id: 1,
      image: "/src/assets/icons/productPage/espresso.jfif",
      name: "Hazelnut Latte",
      price: "IDR 15.000",
      desc: "Cold brewing is a method of brewing that",
      size: ["R", "L", "XL", "250 gr", "500gr"],
      method: ["deliver", "dine in"],
      stock: 10,
    },
    {
      id: 2,
      image: "/src/assets/icons/productPage/latte.jpg",
      name: "Latte",
      price: "IDR 19.000",
      desc: "Cold brewing is a method of brewing that",
      size: ["R", "L", "XL", "250 gr", "500gr"],
      method: ["deliver", "dine in"],
      stock: 10,
    },
    {
      id: 3,
      image: "/src/assets/icons/productPage/affogato.jfif",
      name: "Affogato",
      price: "IDR 15.000",
      desc: "Cold brewing is a method of brewing that",
      size: ["R", "L", "XL", "250 gr", "500gr"],
      method: ["deliver", "dine in"],
      stock: 10,
    },
    {
      id: 4,
      image: "/src/assets/icons/productPage/affogato.jfif",
      name: "Affogato",
      price: "IDR 15.000",
      desc: "Cold brewing is a method of brewing that",
      size: ["R", "L", "XL", "250 gr", "500gr"],
      method: ["deliver", "dine in"],
      stock: 10,
    },
    {
      id: 5,
      image: "/src/assets/icons/productPage/affogato.jfif",
      name: "Affogato",
      price: "IDR 15.000",
      desc: "Cold brewing is a method of brewing that",
      size: ["R", "L", "XL", "250 gr", "500gr"],
      method: ["deliver", "dine in"],
      stock: 10,
    },
  ];
  return (
    <div>
      <NavbarAdmin />
      <Sidebar />
      <div className="flex flex-col">
        <div className="pt-10">
          <ProductSidebar />
        </div>
        <ProductTable products={Products} />
      </div>
    </div>
  );
}

export default AdminInsertProduct;
