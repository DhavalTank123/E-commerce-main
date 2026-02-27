import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
    },
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        incrementQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
        decrementQuantity: (state, action) => {
            const id = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
