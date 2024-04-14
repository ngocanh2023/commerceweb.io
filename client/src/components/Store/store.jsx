import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./apiSlice";

import cartSlice from "./cartSlice";
//import countCartSlice from "./countCartSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [productsApi.reducerPath]: productsApi.reducer,

    cart: cartSlice,
    //count: countCartSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
// Can still subscribe to the store
store.subscribe(() => {
  // console.log(store.getState());
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
