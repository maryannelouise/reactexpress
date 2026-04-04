import { useState } from "react";

export default function Login({ onSwitch }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (form.email.trim() === "" || form.password.trim() === "") {
      setError("Please enter email and password");
      return;
    }

    setError("");

    try {
      // ✅ FIXED URL (you had &#39;)
      const res = await fetch("http://localhost:3001/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // ⚠️ depends on backend (email or username)
          username: form.email, 
          password: form.password,
        }),
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        setMessage("Login successful ✅");
      } else {
        setError(result.message || "Invalid credentials ❌");
      }

    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-rose-400">
      
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 p-8 rounded-3xl shadow-2xl w-[380px]">
        
        <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="peer w-full px-4 pt-5 pb-2 rounded-full bg-white/70 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition"
            />
            <label className="absolute left-4 top-2 text-pink-500 text-sm 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-600
              transition-all">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="peer w-full px-4 pt-5 pb-2 rounded-full bg-white/70 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none"
            />
            <label className="absolute left-4 top-2 text-pink-500 text-sm 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-600
              transition-all">
              Password
            </label>
          </div>

          {/* Messages */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {message && (
            <p className="text-green-600 text-sm text-center">{message}</p>
          )}

          {/* Button */}
          <button className="w-full py-2.5 rounded-full font-semibold text-white 
            bg-gradient-to-r from-pink-500 to-rose-500 
            hover:from-pink-600 hover:to-rose-600 
            shadow-lg transition duration-300">
            Login
          </button>
        </form>

        {/* Switch */}
        <p className="text-sm text-center mt-5 text-gray-700">
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-pink-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}