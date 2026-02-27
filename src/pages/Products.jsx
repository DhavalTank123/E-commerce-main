import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { addItem } from '../store/cartSlice';
import { toast } from 'react-toastify';
import { Loader2, AlertCircle, ShoppingCart } from 'lucide-react';

const Products = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        toast.success(`${product.title.substring(0, 20)}... added to cart!`, {
            position: "bottom-right",
            autoClose: 2000,
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="mt-4 text-gray-500 font-medium">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-red-800 dark:text-red-400">Oops! Something went wrong</h3>
                <p className="text-red-600 dark:text-red-300 mt-2 text-center max-w-md">{error}</p>
                <button
                    onClick={() => dispatch(fetchProducts())}
                    className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition shadow-md"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((product) => (
                    <div key={product.id} className="bg-slate-900 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 border border-slate-800 shadow-xl group">
                        <div className="relative h-64 bg-white p-6 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-lg">
                                ${product.price}
                            </div>
                        </div>

                        <div className="p-5 flex flex-col h-44">
                            <h3 className="text-sm font-black text-white line-clamp-2 mb-2 group-hover:text-blue-500 transition-colors uppercase tracking-tighter leading-tight">
                                {product.title}
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2 mb-auto font-medium">
                                {product.description}
                            </p>

                            <button
                                onClick={() => handleAddToCart(product)}
                                className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest py-3 rounded-lg transition duration-300 shadow-lg shadow-blue-900/20 transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <ShoppingCart size={16} className="text-blue-200" />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
