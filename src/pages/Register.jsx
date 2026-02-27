import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { registrationError, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        return () => dispatch(clearErrors());
    }, [isAuthenticated, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        dispatch(register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        }));

        setIsSubmitting(false);
    };

    useEffect(() => {
        if (registrationError) {
            toast.error(registrationError);
        } else if (isSubmitting === false && formData.name && !registrationError) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.email === formData.email)) {
                toast.success('Registration successful! Please login.');
                navigate('/');
            }
        }
    }, [registrationError, isSubmitting]);
    return (
        <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900 shadow-2xl rounded-2xl p-8 border border-slate-800 transition-all duration-300 hover:border-blue-500/30">

                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 shadow-xl shadow-blue-900/10 border border-blue-500/20">
                        <ShoppingCart size={32} />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-center text-white mb-10 uppercase tracking-tight">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-1">
                        <label
                            htmlFor="name"
                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <User size={18} />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-12 pr-5 py-3.5 text-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1"
                        >
                            Email Address
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
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="password"
                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <Lock size={18} />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
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

                    <div className="space-y-1">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest px-1"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <Lock size={18} />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-12 pr-12 py-3.5 text-white focus:ring-2 focus:ring-blue-600 outline-none transition font-medium"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-500 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition duration-300 shadow-xl shadow-blue-900/20 active:scale-95 mt-4"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-10 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    Already an operative?{" "}
                    <Link
                        to="/"
                        className="text-blue-500 hover:underline font-black"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </section>
    );
}

export default Register;