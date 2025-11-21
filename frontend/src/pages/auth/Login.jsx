import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

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
    <div className="min-h-screen w-screen fixed top-0 left-0 z-10000 flex items-center justify-center bg-bg px-5 sm:px-7 lg:px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-cardBg p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="text-danger mb-4 text-center">{error}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-danger text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border border-border px-3 py-2 rounded"
          />
          {errors.password && (
            <p className="text-danger text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-hoverPrimary transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
