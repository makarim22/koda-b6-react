import React from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import UserTable from "../component/userTable";
import Filter from "../assets/admin/filter.svg";
import Search from "../assets/admin/Search.svg";
import Dropdown from "../assets/admin/dropdown.svg";

function ListUsers() {
  const users = [
    {
      id: 1,
      image: "/src/assets/user/user1.png",
      name: "Eleanor Pena",
      phone: "(205) 555-0100",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 2,
      name: "Eleanor Pena",
      image: "/src/assets/user/user2.png",
      phone: "(205) 555-0100",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 3,
      name: "Eleanor Pena",
      image: "/src/assets/user/user3.png",
      phone: "(205) 555-0100",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 4,
      name: "Eleanor Pena",
      image: "/src/assets/user/user4.png",
      phone: "(205) 555-0100",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
    },
    {
      id: 5,
      name: "Eleanor Pena",
      image: "/src/assets/user/user5.png",
      phone: "(205) 555-0100",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      email: "cikaracak@gmail.com",
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
              User List
              <button className="bg-orange-400 text-black w-35 py-2 px-4 rounded-lg">
                {" "}
                + Add User
              </button>
            </div>
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <span>Search User</span>
                <div class="relative w-72">
                  <input
                    type="text"
                    placeholder="Enter Username"
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

          <UserTable users={users} />
        </main>
      </div>
    </div>
  );
}

export default ListUsers;
