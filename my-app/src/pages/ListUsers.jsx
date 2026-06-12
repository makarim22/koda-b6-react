import React, { useState, useMemo } from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import UserTable from "../component/UserTable";
import Filter from "../assets/admin/filter.svg";
import Search from "../assets/admin/Search.svg";
import Dropdown from "../assets/admin/dropdown.svg";
import UserSidebar from "../component/UserSidebar";
import AdminModal from "../component/AdminModal";
import { useFetch } from "../hooks/useFetch";

function ListUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  const { data: rawUsers, isLoading, error, refetch } = useFetch("/api/users", { token });

  const users = useMemo(() => {
    if (!rawUsers) return [];

    const mapped = rawUsers.map((user) => ({
      id: user.id,
      fullname: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      profileImage: user.profile_image || "",
    }));

    if (!searchQuery) return mapped;

    return mapped.filter(user => 
      user.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rawUsers, searchQuery]);

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
          <div className="flex flex-row justify-between pl-7 pr-7 mt-6 mb-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">User List</h2>
              <button
                onClick={handleOpenAddModal}
                className="bg-orange-400 hover:bg-orange-500 text-black px-4 py-2 rounded-lg font-medium transition w-36"
              >
                + Add User
              </button>
            </div>
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-2">Search User</span>
                <div className="relative w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Username or Email"
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

          <div className="px-7">
            {isLoading ? (
              <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg font-medium">Loading users...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center h-64 border rounded-lg bg-red-50 text-red-700 p-4">
                <p className="font-semibold mb-2">Error loading users</p>
                <p className="mb-4">{error}</p>
                <button 
                  onClick={refetch}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
                >
                  Retry
                </button>
              </div>
            ) : users.length === 0 ? (
               <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg font-medium">No users found.</p>
              </div>
            ) : (
              <UserTable
                users={users}
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
