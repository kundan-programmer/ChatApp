import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth  } from "../context/Authprovider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser]=useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

      //watch the password and confirm password fields
      const password = watch("password","");
      const confirmPassword = watch("confirmPassword","");

  const validatePasswordMatch=(value)=>{
    return value===password || "Password do not match"
  }

 const onSubmit =async (data) => {
  const userInfo = {
    fullname: data.fullname,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };

 await axios.post("/api/user/signup", userInfo)
    .then((response) => {
      
      if (response.data) {
        toast.success("Signup successful");
      }
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuthUser(response.data);
    })
    .catch((error) => {

      if (error.response) {
        
        toast.error("Error: "+error.response.data.error);
      }
    });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      
      {/* 🔴 FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[380px] border border-gray-600 rounded-xl p-6 bg-[#111827] shadow-xl"
      >
        <h1 className="text-center text-xl font-semibold text-white">
          Chat<span className="text-green-500">App</span>
        </h1>

        <h2 className="text-white mt-4 mb-4 font-medium">Signup</h2>

        {/* FULL NAME */}
        <input
          type="text"
          placeholder="Fullname"
          {...register("fullname", { required: true })}
          className="w-full px-4 py-2 rounded-md bg-[#0f172a] border border-gray-700 text-gray-300 focus:outline-none focus:border-green-500"
        />
        {errors.fullname && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full mt-3 px-4 py-2 rounded-md bg-[#0f172a] border border-gray-700 text-gray-300 focus:outline-none focus:border-green-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">This field is required</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "This field is required" })}
          className="w-full mt-3 px-4 py-2 rounded-md bg-[#0f172a] border border-gray-700 text-gray-300 focus:outline-none focus:border-green-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
             {errors.password.message}
          </p>
        )}

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "This field is required", validate:validatePasswordMatch
           
          })}
          className="w-full mt-3 px-4 py-2 rounded-md bg-[#0f172a] border border-gray-700 text-gray-300 focus:outline-none focus:border-green-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-400">
            Have an account?{" "}
            <Link to="/login" className="text-blue-400 cursor-pointer">Login</Link>
          </p>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
