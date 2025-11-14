import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../services/api";

export interface Category {
  id: string;
  name: string;
  description: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error?: string;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
};

// Lấy danh sách categories
export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/categories");
      return res.data as Category[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
