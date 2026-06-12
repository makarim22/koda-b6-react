import React, { useState, useMemo } from "react";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Sidebar from "../layouts/Sidebar";
import { useFetch } from "../hooks/useFetch";
import Search from "../assets/admin/Search.svg";
import http from "../lib/http";
import { Star } from "lucide-react";

export default function ListReviews() {
  const [searchQuery, setSearchQuery] = useState("");

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

  const { data: rawResponse, isLoading, error, refetch } = useFetch("/api/reviews", { token });
  
  // The API returns { message: "...", data: [...] }
  const rawReviews = rawResponse?.data || [];

  const reviews = useMemo(() => {
    if (!rawReviews) return [];
    if (!searchQuery) return rawReviews;

    return rawReviews.filter(r => 
      r.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rawReviews, searchQuery]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) return;
    
    try {
      const res = await http(`/api/reviews/${id}`, {}, { method: 'DELETE', token });
      if (res.ok) {
        refetch();
      } else {
        alert("Failed to delete review");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <NavbarAdmin />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-row justify-between pl-7 pr-7 py-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Review Moderation</h2>
              <p className="text-sm text-gray-500">Monitor and moderate customer reviews across all products.</p>
            </div>
            <div className="flex flex-row gap-4 items-end">
              <div className="flex flex-col">
                <div className="relative w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by product, user, or review text..."
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
                <p className="text-gray-500 text-lg font-medium">Loading reviews...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col justify-center items-center h-64 border rounded-lg bg-red-50 text-red-700 p-4">
                <p className="font-semibold mb-2">Error loading reviews</p>
                <p className="mb-4">{error}</p>
                <button 
                  onClick={refetch}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
                >
                  Retry
                </button>
              </div>
            ) : reviews.length === 0 ? (
               <div className="flex justify-center items-center h-64 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-lg font-medium">No reviews found.</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Review Message</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reviews.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.product_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="font-medium text-gray-900">{r.full_name}</div>
                          <div className="text-xs">{r.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {renderStars(r.rating)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                           <p className="line-clamp-2">{r.message}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 hover:border-red-300 rounded-md transition-colors">
                            Delete / Hide
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
