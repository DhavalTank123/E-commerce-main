import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/authSlice';
import { toast } from 'react-toastify';
import { User, Mail, Lock, ShieldCheck, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            toast.error('All fields are required');
            return;
        }
        dispatch(updateProfile(formData));
        toast.success('Profile updated successfully! ✨');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    to="/dashboard"
                    className="p-2 hover:bg-slate-800 rounded-xl transition text-slate-400"
                >
                    <ArrowLeft size={20} />
                </Link>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Account Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center">
                        <div className="w-24 h-24 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-4 border-4 border-slate-800 shadow-sm text-4xl font-black text-blue-500">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight">{user?.name}</h3>
                        <p className="text-sm text-slate-400 font-medium mt-1">{user?.email}</p>

                        <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-black text-green-500 bg-green-500/10 px-4 py-2 rounded-full justify-center uppercase tracking-widest">
                                <ShieldCheck size={14} />
                                <span>Verified Account</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                        <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight">Personal Information</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 flex items-center gap-2 uppercase tracking-widest px-1">
                                        <User size={14} className="text-blue-500" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition text-white font-medium"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 flex items-center gap-2 uppercase tracking-widest px-1">
                                        <Mail size={14} className="text-blue-500" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition text-white font-medium"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 flex items-center gap-2 uppercase tracking-widest px-1">
                                        <Lock size={14} className="text-blue-500" />
                                        Secure Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition text-white font-medium"
                                        placeholder="Enter new password"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-800 mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition duration-300 shadow-xl shadow-blue-900/20 active:scale-95"
                                >
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
