import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify';


const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, sessionExpiry, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            return;
        }

        if (!sessionExpiry) return;

        const remaining = sessionExpiry - Date.now();

        if (remaining <= 0) {
            dispatch(logout());
            navigate('/');
            return;
        }

        // Precise timer — fires exactly when session expires
        const timer = setTimeout(() => {
            dispatch(logout());
            navigate('/');
        }, remaining);

        return () => clearTimeout(timer);
    }, [isAuthenticated, sessionExpiry, dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-4">
                    <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">
                        Welcome back,<br />
                        <span className="text-blue-500">{user?.name || 'User'}</span>
                    </h2>
                    <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full opacity-50 mt-8"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;