import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import locationIcon from "../assets/icons/productPage/Location.svg";
import mailIcon from "../assets/icons/mail.svg";
import ProfileIcon from "../assets/icons/productPage/Profile.svg";
import passwordIcon from "../assets/icons/Password.svg";

import {

  Phone

} from "lucide-react";

function Profile() {
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user-data");
    if (userData) {
      const parsedData = JSON.parse(userData);
      const activeUser = parsedData.find((u) => u.isLoggedIn === true);
      if (activeUser) {
        const { fullname, email, phone, address, id, profileImage } = activeUser;
        return { fullname, email, phone, address, id, profileImage: profileImage || null };
      }
    }
    return { fullname: "Guest", email: "", phone: "", address: "", profileImage: null };
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: user.fullname || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    },
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        
        try {
          const users = JSON.parse(localStorage.getItem("user-data")) || [];
          const userLoggedInIndex = users.findIndex((u) => u.isLoggedIn === true);

          if (userLoggedInIndex !== -1) {
            users[userLoggedInIndex].profileImage = base64String;
            localStorage.setItem("user-data", JSON.stringify(users));
            
            setUser({
              ...user,
              profileImage: base64String,
            });

            alert("Berhasil mengunggah foto!");
          }
        } catch (error) {
          console.error("terjadi kesalahan:", error);
          alert("gagal mengupload foto!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data) => {
    try {
      const users = JSON.parse(localStorage.getItem("user-data")) || [];
      const userLoggedInIndex = users.findIndex((u) => u.isLoggedIn === true);

      if (userLoggedInIndex === -1) {
        alert("Gagam mendapatkan data user");
        return;
      }

      const updatedUsers = [...users];
      updatedUsers[userLoggedInIndex] = {
        ...updatedUsers[userLoggedInIndex],
        fullname: data.fullName,
        email: data.email,
        phone: data.phone || "",
        address: data.address || "",
        profileImage: user.profileImage,
        ...(data.password && { password: data.password }),
      };

      localStorage.setItem("user-data", JSON.stringify(updatedUsers));

      setUser({
        fullname: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        id: user.id,
        profileImage: user.profileImage,
      });

      alert("Berhasil mengupdate profil!");
    } catch (error) {
      console.error("terjadi kesalahan:", error);
      alert("Gagal mengupdate profil");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header bgColor="bg-black" />

      <main className="flex-1 pt-10 px-6 md:px-12">
        <h1 className="text-4xl font-bold mb-12">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
              <div className="mb-6 relative">
                <img
                  src={user.profileImage || "https://via.placeholder.com/150?text=No+Photo"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
                {user.fullname || "Guest"}
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                {user.email || "No email"}
              </p>

              <button
                onClick={triggerFileInput}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mb-6 transition"
              >
                Upload New Photo
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

              <p className="text-sm text-gray-600 text-center">
                Since {new Date().toLocaleDateString("en-id", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-gray-900 font-semibold mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <img
                      src={ProfileIcon}
                      alt="Profile"
                      className="absolute left-4 top-3 w-5 h-5"
                    />
                    <input
                      type="text"
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-red-500 text-sm">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-3">
                    Email
                  </label>
                  <div className="relative">
                    <img
                      src={mailIcon}
                      alt="Email"
                      className="absolute left-4 top-3 w-5 h-5"
                    />
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-3">
                    Phone
                  </label>
                  <div className="relative">
                    <img
                      src={Phone}
                      alt="Phone"
                      className="absolute left-4 top-3 w-5 h-5"
                    />
                    <input
                      type="tel"
                      {...register("phone")}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-gray-900 font-semibold">
                      Password
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-orange-500 text-sm font-medium hover:underline"
                    >
                      Set New Password
                    </a>
                  </div>
                  <div className="relative">
                    <img
                      src={passwordIcon}
                      alt="Password"
                      className="absolute left-4 top-3 w-5 h-5"
                    />
                    <input
                      type="password"
                      {...register("password")}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-3">
                    Address
                  </label>
                  <div className="relative">
                    <img
                      src={locationIcon}
                      alt="Location"
                      className="absolute left-4 top-3 w-5 h-5"
                    />
                    <input
                      type="text"
                      {...register("address")}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;