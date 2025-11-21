import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      if (resultAction.payload.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-25 bg-bg px-5 sm:px-7 lg:px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-cardBg p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="text-red-500 mb-4 text-center">{error}</div>
        )}

        {/* Email Input */}
        <div className="mb-4 relative">
          <label className="block mb-1 font-semibold">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <AiOutlineMail size={20} />
            </span>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-border px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <label className="block mb-1 font-semibold">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <AiOutlineLock size={20} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full border border-border px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-hoverPrimary transition mb-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
