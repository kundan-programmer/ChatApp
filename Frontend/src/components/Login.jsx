import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


function Login() {
  const [authUser, setAuthUser] = useAuth();
      const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm();
    
        const onSubmit = async (data) => {
  const userInfo = {
    email: data.email,
    password: data.password,
  };

 await axios.post("/api/user/login", userInfo, { withCredentials:true,

   })
    .then((response) => {
      
      if (response.data) {
        toast.success("Login successful");
      }
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuthUser(response.data);

     

    })
    .catch((error) => {

      if (error.response) {
        
        toast.error("Error: "+error.response.data.error);

      }
       else {
        alert("Sever not reachable. Try again letter. ");
       }
    });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
     <form
      onSubmit={handleSubmit(onSubmit)}
    className="w-[380px] border border-gray-600 rounded-xl p-6 bg-[#111827] shadow-xl"
     >
        {/* Title */}
        <h1 className="text-center text-xl font-semibold text-white">
          Chat<span className="text-green-500">App</span>
        </h1>

        {/* Heading */}
        <h2 className="text-white mt-4 mb-4 font-medium">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full mb-3 px-4 py-2 rounded-md bg-[#0f172a] border border-gray-700 text-gray-300 focus:outline-none focus:border-green-500"
        />
         {errors.email && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "This field is required" })}
          className="w-full mb-4 px-4 py-2 rounded-md bg-[#0f172a] border border-gray-700 text-gray-300 focus:outline-none focus:border-green-500"
        />
         {errors.password && (
          <p className="text-red-500 text-sm mt-1">
             {errors.password.message}
          </p>
        )}

        {/* Bottom Row */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            New user?{" "}
            <Link to="/signup" className="text-blue-400 cursor-pointer">Signup</Link>
          </p>

          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md">
            Login
          </button>
        </div>
        </form>
      </div>
  );
}

export default Login;
