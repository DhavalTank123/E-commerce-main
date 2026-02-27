import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    isAuthenticated: !!localStorage.getItem('currentUser'),
    registrationError: null,
    loginError: null,
    sessionExpiry: localStorage.getItem('sessionExpiry') ? Number(localStorage.getItem('sessionExpiry')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action) => {
            const { name, email, password } = action.payload;
            const users = JSON.parse(localStorage.getItem('users')) || [];

            if (users.find(u => u.email === email)) {
                state.registrationError = 'User with this email already exists';
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            state.registrationError = null;
        },
        login: (state, action) => {
            const { email, password } = action.payload;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                const expiry = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
                state.user = user;
                state.isAuthenticated = true;
                state.loginError = null;
                state.sessionExpiry = expiry;
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('sessionExpiry', expiry.toString());
            } else {
                state.loginError = 'Invalid email or password';
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loginError = null;
            state.sessionExpiry = null;
            localStorage.removeItem('currentUser');
            localStorage.removeItem('sessionExpiry');
        },
        clearErrors: (state) => {
            state.registrationError = null;
            state.loginError = null;
        },
        checkSession: (state) => {
            const now = new Date().getTime();
            if (state.sessionExpiry && now > state.sessionExpiry) {
                state.user = null;
                state.isAuthenticated = false;
                state.sessionExpiry = null;
                localStorage.removeItem('currentUser');
                localStorage.removeItem('sessionExpiry');
            }
        },
        updateProfile: (state, action) => {
            const { name, email, password } = action.payload;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.email === state.user.email);

            if (userIndex !== -1) {
                const updatedUser = { ...users[userIndex], name, email, password };
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
                state.user = updatedUser;
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }
        }
    },
});

export const { register, login, logout, clearErrors, checkSession, updateProfile } = authSlice.actions;
export default authSlice.reducer;
