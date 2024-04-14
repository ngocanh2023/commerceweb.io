import { createSlice } from "@reduxjs/toolkit";

let getData = localStorage.getItem("products") ?? "[]";
let productArray = JSON.parse(getData);

let initialState = {
  cart: productArray ? productArray : [],
  count: [],
  // showCounter: true,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      var cart = [...state.cart];
      const productIndex = cart.indexOf(
        (item) => item._id.$oid === action.payload._id.$oid
      );
      if (productIndex !== -1) {
        state.cart[productIndex].count = action.payload.count;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("products", JSON.stringify(state.cart));
      window.location.href = "/cart";
      //   if (state.cart.count !== 0) {
      //     state.cart.push(action.payload);
      //   } else {
      //     let boolean = state.cart.every((item) => item.id !== action.payload.id);
      //     if (boolean) {
      //       state.cart.push(action.payload);
      //       console.log(action.payload);
      //     }
      //   }
    },

    updateCart: (state, action) => {
      Object.assign(action.payload);
      let index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      state.products.splice(index, 1, action.payload);
    },
    deleteCart: (state, action) => {
      let index = state.cart.findIndex(
        (item) => item._id["$oid"] === action.payload
      );
      state.cart.splice(index, 1);
    },
    increment(state, action) {
      let index = state.cart.findIndex(
        (item) => item[0]._id.$oid === action.payload
      );
      if (index) {
        // console.log({ index });

        state.count++;
      }

      // console.log("state.cart.cart:", state.cart.cart);
      // console.log("state.cart[1]:", state.cart[1]);
      // console.log("state.count:", state.count);
      // console.log("state", state);

      // console.log("state.cart.cart", state.cart.count);
      // console.log({ productArray });
    },

    decrement(state, action) {
      // console.log("state.cart", state.cart);
      let index = state.cart.findIndex(
        (item) => item[0]._id.$oid === action.payload
      );
      // console.log({ index });
      if (index && state.count > 0) {
        state.count--;
      }
    },
  },
});

export const counterActions = cartSlice.actions;

export default cartSlice.reducer;
