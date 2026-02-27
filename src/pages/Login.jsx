import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { AlertCircle, ShoppingCart, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginError, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log('Login State - isAuthenticated:', isAuthenticated);
        if (isAuthenticated) {
            console.log('Redirecting to dashboard...');
            navigate('/dashboard');
        }
        return () => dispatch(clearErrors());
    }, [isAuthenticated, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt started with:', formData.email);
        setIsSubmitting(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        dispatch(login(formData));
        setIsSubmitting(false);
        console.log('Login action dispatched');
    };
    return (
        <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900 shadow-2xl rounded-2xl p-8 border border-slate-800 transition-all duration-300 hover:border-blue-500/30">

                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 shadow-xl shadow-blue-900/10 border border-blue-500/20">
                        <ShoppingCart size={32} />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-center text-white mb-10 uppercase tracking-tight">
                    Login
                </h2>

                {loginError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
                        <AlertCircle size={20} />
                        <p className="text-sm font-black uppercase tracking-tighter">{loginError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1"
                        >
                            Email address
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <Mail size={18} />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-12 pr-5 py-3.5 text-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1"
                            >
                                Password
                            </label>
                        </div>

                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <Lock size={18} />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-12 pr-12 py-3.5 text-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-500 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition duration-300 shadow-xl shadow-blue-900/20 active:scale-95 pt-4"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-10 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    Create Account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:underline font-black"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </section>
    );
}

export default Login;