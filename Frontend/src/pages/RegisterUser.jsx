import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import CompanyNameLoader from "../components/CompanyNameLoader";
import toast from 'react-hot-toast'

const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/api/auth/register", data, {
        withCredentials: true,
      });

      const userData = response?.data?.user || response?.data;
      dispatch(setUser(userData));
      toast.success('Regitser SuccessFully')
      navigate("/complete-profile", { replace: true });
    } catch (err) {
      console.log("error", err.response?.data?.message || err.message);
      alert("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#344e41] flex items-center justify-center  p-5">
      <div className="w-full max-w-6xl overflow-hidden grid lg:grid-cols-2 shadow-[0_10px_50px_rgba(0,55,0,0.55)] rounded-xl ">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-[#3a5a40] to-[#a3b18a] p-14 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Welcome <span className="text-[30px] text-[#000]  ">PulesUp</span>
          </h1>

          <p className="text-lg leading-8 text-[#dad7cd]">
            Create your account and start chatting with your friends in
            real-time.
          </p>

          <div className="mt-12 ml-20 ">
             <CompanyNameLoader />
          </div>
        </div>

        {/* Right Side */}
        <div className=" bg-gradient-to-br from-[#3a5a40] to-[#a3b18a] p-14 p-8 sm:p-12">

          <h2 className="text-xl sm:text-2xl  font-bold text-[#dad7cd] mb-2">
            Create Account
          </h2>

          <p className="text-[#dad7cd] mb-8 text-10px sm:text-lg">
            Join your chatting community.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username"
                {...register("userName", {
                  required: "Username is required",
                })}
                className="w-full rounded-xl shadow-sm shadow-[#dad7cd]  px-4 py-2 sm:py-3 text-white outline-none"
              />

              {errors.userName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full rounded-xl shadow-sm shadow-[#dad7cd] border-slate-700 px-4 py-2 sm:py-3 text-white outline-none"
              />

              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile */}

            <div>
              <input
                type="tel"
                placeholder="Mobile Number"
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                })}
                className="w-full rounded-xl shadow-sm shadow-[#dad7cd] px-4 py-2 sm:py-3 text-white outline-none focus:border-red-500"
              />

              {errors.mobileNumber && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center rounded-xl shadow-sm shadow-[#dad7cd] overflow-hidden bg-white/10">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full px-4 py-2 sm:py-3 text-white bg-transparent outline-none"
                />
                <button
                  type="button"
                  className="px-4 text-gray-900 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className={`jelly-btn w-full py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-green-600 text-white"
                }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-slate-900">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white hover:underline underline hover:text-cyan-400"
              >
                Login
              </Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};

export default RegisterUser;