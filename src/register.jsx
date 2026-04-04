import { useState } from "react";

export default function Register({ onSwitch }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        birthdate: "",
        password: "",
        confirmPassword: "",
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
        if (
            form.name.trim() === "" ||
            form.email.trim() === "" ||
            form.password.trim() === ""
        ) {
            setError("Please fill in all required fields");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match 💔");
            return;
        }

        setError("");

        try {
            // ✅ FIXED fetch URL (you had a syntax error)
            const response = await fetch("http://localhost:3001/adduser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: form.name,
                    email: form.email,
                    password: form.password,
                    birthdate: form.birthdate,
                }),
            });

            const result = await response.json();
            console.log(result);

            setMessage("Account created successfully ✅");
        } catch (err) {
            console.error(err);
            setError("Something went wrong ❌");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-rose-400">
            
            <div className="backdrop-blur-xl bg-white/30 border border-white/40 p-8 rounded-3xl shadow-2xl w-[380px]">
                
                <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name + Email */}
                    {[
                        { name: "name", type: "text", label: "Full Name" },
                        { name: "email", type: "email", label: "Email" },
                    ].map((field) => (
                        <div key={field.name} className="relative">
                            <input
                                type={field.type}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                required
                                className="peer w-full px-4 pt-5 pb-2 rounded-full bg-white/70 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none transition"
                            />
                            <label className="absolute left-4 top-2 text-pink-500 text-sm 
                                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                                peer-placeholder-shown:text-gray-400
                                peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-600
                                transition-all">
                                {field.label}
                            </label>
                        </div>
                    ))}

                    {/* Birthdate */}
                    <div className="relative">
                        <input
                            type="date"
                            name="birthdate"
                            value={form.birthdate}
                            onChange={handleChange}
                            required
                            className="peer w-full px-4 pt-5 pb-2 rounded-full bg-white/70 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none"
                        />
                        <label className="absolute left-4 top-2 text-pink-500 text-sm">
                            Birthdate
                        </label>
                    </div>

                    {/* Passwords */}
                    {[
                        { name: "password", label: "Password" },
                        { name: "confirmPassword", label: "Confirm Password" },
                    ].map((field) => (
                        <div key={field.name} className="relative">
                            <input
                                type="password"
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                required
                                className="peer w-full px-4 pt-5 pb-2 rounded-full bg-white/70 border border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-300 outline-none"
                            />
                            <label className="absolute left-4 top-2 text-pink-500 text-sm 
                                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
                                peer-placeholder-shown:text-gray-400
                                peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-600
                                transition-all">
                                {field.label}
                            </label>
                        </div>
                    ))}

                    {/* Error / Success */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    {message && (
                        <p className="text-green-600 text-sm text-center">{message}</p>
                    )}

                    {/* Submit */}
                    <button className="w-full py-2.5 rounded-full font-semibold text-white 
                        bg-gradient-to-r from-pink-500 to-rose-500 
                        hover:from-pink-600 hover:to-rose-600 
                        shadow-lg transition duration-300">
                        Create Account
                    </button>
                </form>

                {/* Switch */}
                <p className="text-sm text-center mt-5 text-gray-700">
                    Already have an account?{" "}
                    <button
                        onClick={onSwitch}
                        className="text-pink-600 font-semibold hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}