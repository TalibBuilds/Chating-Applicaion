import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from '../redux/userSlice'
import CompanyNameLoader from "../components/CompanyNameLoader";
import toast from "react-hot-toast";

const LoginUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [seepassword, setSeepassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError(''); // naya state

      const response = await axiosInstance.post(
        "/api/auth/login",
        data
      );

      const userData = response?.data?.user;

      if (!userData) {
        setServerError("Something went wrong. Please try again.");
        return;
      }

      dispatch(setUser(userData));
      toast.success('Login SuccessFully')
      navigate("/", { replace: true });

    } catch (err) {
      resetField("password");
      setServerError(err.response?.data?.message || "Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#344e41] flex items-center justify-center p-5">
      <div className="w-full max-w-6xl bg-white shadow-[0_10px_50px_rgba(0,55,0,0.55)] rounded-xl  overflow-hidden grid lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center  bg-gradient-to-br from-[#3a5a40] to-[#a3b18a] p-14  p-14 text-[#dad7cd]">

          <h1 className="text-5xl font-bold mb-6">
            Welcome
            <span className="text-black ml-2 text-[30px]  ">
              PulseUp
            </span>
          </h1>

          <p className="text-lg leading-8">
            Login to continue your chatting journey with PulseUp.
          </p>

          <div className="mt-10 flex justify-center">
             <CompanyNameLoader />
          </div>

        </div>

        {/* Right Side */}

        <div className="bg-white p-8 sm:p-12 lg:p-14  bg-gradient-to-tl from-[#a3b18a] to-[#315140] p-14 ">

          <h2 className="text-2xl md:text-3xl font-bold text-[#dad9cd] ">
            Welcome Back
          </h2>

          <p className="text-[#dad9cd]  mt-2 mb-8 text-ms md:text-lg">
            Login to your account
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Identifier */}

            <div>

              <input
                type="text"
                placeholder="Email or Mobile Number"
                {...register("Identifier", {
                  required: "Email or Mobile is required",
                })}
                className="w-full rounded-xl text-[#dad9cd]  shadow-sm shadow-[#dad7cd] px-4 py-1.5 sm:py-3 outline-none "
              />



              {errors.Identifier && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Identifier.message}
                </p>
              )}

            </div>

            {/* Password */}
            <div>
              <div className="flex text-[#dad9cd] items-center rounded-xl shadow-sm shadow-[#dad9cd] overflow-hidden ">
                <input
                  className="w-full px-4 py-1.5 sm:py-3 outline-none bg-transparent"
                  type={seepassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                
                {serverError && (
                  <p className="text-red-500 text-sm text-center">{serverError}</p>
                )}

                <button
                  type="button"
                  className="px-4 text-slate-700 hover:text-slate-900"
                  onClick={() => setSeepassword(!seepassword)}
                >
                  {seepassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}

            <button
              disabled={loading}
              className={`jelly-btn  w-full py-1.5  sm:py-3 rounded-xl font-semibold transition-all duration-300 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "shadow-sm shadow-green-700 hover:bg-green-600 text-white"
                }`}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            <p className="text-center text-slate-900">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-white font-semibold hover:underline hover:text-cyan-400"
              >
                Sign Up
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginUser;