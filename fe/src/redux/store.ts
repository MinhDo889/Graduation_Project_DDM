import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSilce";
import productReducer from "../redux/slices/productSlice";
import categoryReducer from "../redux/slices/categoriesSilce";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
