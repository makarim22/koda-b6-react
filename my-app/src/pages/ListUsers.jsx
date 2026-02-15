import React from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import UserTable from "../component/userTable";
import Filter from "../assets/admin/filter.svg";
import Search from "../assets/admin/Search.svg";
import Dropdown from "../assets/admin/dropdown.svg";
import { useState, useEffect } from "react";
import UserSidebar from "../component/UserSidebar";
import AdminModal from "../component/AdminModal";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("selected user", selectedUser);
  const [modalConfig, setModalConfig] = useState({
    title: "Add",
    action: "Add",
  });

  useEffect(() => {
    const fetchUsers = () => {
      try {
        const usersData = localStorage.getItem("user-data");
        console.log("usernya", usersData);
        if (usersData) {
          const parsedUser = JSON.parse(usersData);

          if (Array.isArray(parsedUser)) {
            setUsers(parsedUser);
          } else {
            console.warn(
              "Data 'order' di localStorage bukan array:",
              parsedUser,
            );
            setUsers([]);
          }
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error parsing order data from localStorage:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  console.log("userss", users);

  const handleOpenAddModal = () => {
    setModalConfig({ title: "Add", action: "Add" });
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setModalConfig({ title: "View User Details", action: "View" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setModalConfig({ title: "Edit User", action: "Edit" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
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
          <div className="flex flex-row justify-between pl-7 pr-7">
            <div className="flex flex-col">
              User List
              <button
                onClick={handleOpenAddModal}
                className="bg-orange-400 text-black w-35 py-2 px-4 rounded-lg"
              >
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

          <UserTable
            users={users}
            onEdit={handleOpenEditModal}
            onView={handleOpenViewModal}
            onDelete={handleDeleteUser}
          />

          <AdminModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={modalConfig.title}
            action={modalConfig.action}
          >
            <UserSidebar
              onClose={handleCloseModal}
              title={modalConfig.title}
              action={modalConfig.action}
              user={selectedUser}
              isInsert={modalConfig.action === "Add"}
            />
          </AdminModal>
        </main>
      </div>
    </div>
  );
}

export default ListUsers;
