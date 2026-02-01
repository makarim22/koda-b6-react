import React from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import { ProductTable } from "../component/ProductTable";
import Filter from "../assets/admin/filter.svg";
import Search from "../assets/admin/Search.svg";

export default function AdminProduct() {
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
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto ">
          <div className="flex flex-row justify-between pl-7 pr-7">
            <div className="flex flex-col">
              Product
              <button className="bg-orange-400 text-black w-35 py-2 px-4 rounded-lg">
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

          <ProductTable products={Products} itemsPerPage={5} />
        </main>
      </div>
    </div>
  );
}
