import { createSlice } from '@reduxjs/toolkit';



const CartReducerSlice = createSlice({
    name: 'CartReducerSlice',
    initialState: {
        dataCart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            let isInCart = state.dataCart?.find((cartItem) => cartItem.itemId == action.payload?.itemId ? true : false);
            if (isInCart) {
                const index = state.dataCart.findIndex((item) => item.itemId == action.payload?.itemId);
                if (action.payload?.qty == 0) {
                    if (index > -1) {
                        state.dataCart.splice(index, 1);
                    }
                } else {
                    state.dataCart = state.dataCart.map((item, index) => {
                        return {
                            ...item,
                            qty: item.itemId == action.payload?.itemId ? action.payload?.qty : item.qty
                        };
                    });
                }
            } else {
                state.dataCart.unshift(action.payload);
            }
        },
        deleteFromCart: (state, action) => {
            console.log('deleteFromCart', action.payload);
            const index = state.dataCart.findIndex((item) => item.name == action.payload.name);
            console.log(index);
            if (index > -1) {
                state.dataCart.splice(index, 1);
            }
        },
        clearCart: (state) => {
            state.dataCart = []
        }
    },
});

export const { addToCart, deleteFromCart,clearCart } = CartReducerSlice.actions;
export default CartReducerSlice.reducer;