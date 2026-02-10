import { Input } from "../component/input";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Profile() {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user-data");
    if (userData) {
      const parsedData = JSON.parse(userData);
      const activeUser = parsedData.find((user) => user.isLoggedIn === true);
      const { fullname, email, phone, address } = activeUser;
      return { fullname, email, phone, address };
    }
    return {};
  });

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();

  const users = JSON.parse(localStorage.getItem("user-data"));

  const userLoggedIn = users.filter((user) => user.isLoggedIn === true);
  console.log("log in usernya adalah", userLoggedIn);

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("user-data"));

    const userLoggedIn = users.findIndex((user) => user.isLoggedIn === true);

    const updatedUsers = [...users];

    updatedUsers[userLoggedIn] = {
      ...updatedUsers[userLoggedIn],
      fullname: data.fullName,
      email: data.email, 
      phone: data.phone,
      password: data.password,
      address: data.address,
    };

     localStorage.setItem('user-data', JSON.stringify(updatedUsers));
    console.log('Data pengguna berhasil diupdate:', updatedUsers[userLoggedIn]);

    alert('Profil berhasil diupdate!');
  };

  return (
    <div>
      <Header bgColor="bg-black" />

      <div className="flex flex-row pt-20 justify-center">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md min-w-[250px] flex-1">
          <span>{user.fullname || "Guest"}</span>
          <button>Upload New Photo</button>
          <span>Since 20 January 2022</span>
        </div>
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md min-w-[250px] flex-1">
        
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span>First Name</span>
            <input label="fullname" {...register("fullName")} />
            <span>Email</span>
            <input {...register("email")} />
            <span>Phone</span>
            <input {...register("phone")} />
            <span>Password</span>
            <input {...register("password")} />
            <span>Address</span>
            <input {...register("address")} />

            <input type="submit" />
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
