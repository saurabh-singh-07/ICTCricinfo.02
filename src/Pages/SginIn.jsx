import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Registration Data:", form);

    // 🔥 Connect backend API here
  };

  return (
    <div className=" card min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-md p-8 border border-white/20">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-2">
          🏏 Create Account
        </h2>
        <p className="text-center dark:text-gray-200 text-slate-900 mb-6">
          Join Cricket Hub today
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <label htmlFor="name">Enter Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 dark:text-white text-slate-700 dark:placeholder-gray-300 placeholder-gray-600/60 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Email */}
          <label htmlFor="email">Enter Password </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 dark:text-white text-slate-700 dark:placeholder-gray-300 placeholder-gray-600/60 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <label htmlFor="password">Enter Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 dark:text-white text-slate-700 dark:placeholder-gray-300 placeholder-gray-600/60 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Confirm Password */}
          <label htmlFor="password">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 dark:text-white text-slate-700 dark:placeholder-gray-300 placeholder-gray-600/60 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-green-700 font-semibold py-2 rounded-lg hover:bg-green-100 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center dark:text-gray-200 text-gray-700 mt-6 text-sm">
          Already have an account?{" "}
          <span className="dark:text-white text-slate-800 font-semibold cursor-pointer hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
