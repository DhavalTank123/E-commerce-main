import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = items.length > 0 ? 0 : 0; 
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] p-8 bg-slate-900/50 rounded-3xl backdrop-blur-sm border border-slate-800 transition-all duration-500 hover:border-slate-700/50">
                <div className="w-24 h-24 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-8 shadow-2xl border border-slate-700 rotate-3 transition-transform hover:rotate-0">
                    <ShoppingBag className="w-12 h-12 text-blue-500" />
                </div>
                <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">Your cart is empty</h2>
                <p className="text-slate-400 mb-10 text-center max-w-sm font-medium leading-relaxed">
                    Looks like your aesthetic journey hasn't started yet. Browse our curated collection and find your perfect style.
                </p>
                <Link
                    to="/products"
                    className="flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95"
                >
                    <span>Explore Products</span>
                    <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">Shopping Cart</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4 transition-all hover:border-slate-700">
                            <div className="w-24 h-24 bg-white p-2 rounded-xl border border-slate-800 flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-black text-white truncate mb-1 uppercase text-sm tracking-tight">{item.title}</h3>
                                <p className="text-blue-500 font-black mb-3 text-lg">${item.price}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                                        <button
                                            onClick={() => dispatch(decrementQuantity(item.id))}
                                            className="p-1.5 hover:bg-slate-700 rounded-md transition text-slate-400 disabled:opacity-30"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-10 text-center font-black text-white">{item.quantity}</span>
                                        <button
                                            onClick={() => dispatch(incrementQuantity(item.id))}
                                            className="p-1.5 hover:bg-slate-700 rounded-md transition text-slate-400"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => dispatch(removeItem(item.id))}
                                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="hidden sm:block text-right ml-4">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Subtotal</p>
                                <p className="font-black text-white">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-800 sticky top-6">
                        <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tight">Order Summary</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-slate-400 font-medium">
                                <span>Subtotal</span>
                                <span className="font-black text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-400 font-medium">
                                <span>Shipping</span>
                                <span className="font-black text-green-500">Free</span>
                            </div>
                            <div className="border-t border-slate-800 pt-4 mt-4 flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Total Amount</p>
                                    <p className="text-3xl font-black text-blue-500">${total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition duration-300 shadow-xl shadow-blue-900/20 active:scale-[0.98] mb-4">
                            Process Checkout
                        </button>

                        <Link to="/products" className="block text-center text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition">
                            Back to Store
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
