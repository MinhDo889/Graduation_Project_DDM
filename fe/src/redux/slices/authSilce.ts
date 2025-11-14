import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";
import type { AuthState, User } from "../types/auth";

// =========================
// TYPES
// =========================
interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface DecodedToken {
  id: string; // 🔹 thêm id
  email: string;
  name?: string;
  role: "user" | "admin" | "super_admin";
  skin_type?: string;
}

// =========================
// LOGIN ✅
// =========================
export const loginUser = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    const { token } = res.data;

    // ✅ Decode token
    const decodedToken = jwtDecode<DecodedToken>(token);

    // ✅ Lưu vào localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("email", decodedToken.email);
    localStorage.setItem("name", decodedToken.name || "");
    localStorage.setItem("role", decodedToken.role);
    localStorage.setItem("id", decodedToken.id);
    if (decodedToken.skin_type) {
      localStorage.setItem("skin_type", decodedToken.skin_type);
    }

    return {
      id: decodedToken.id,
      token,
      email: decodedToken.email,
      name: decodedToken.name,
      role: decodedToken.role,
      skin_type: decodedToken.skin_type,
    };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Đăng nhập thất bại");
  }
});

// =========================
// REGISTER ✅
// =========================
export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      const { token } = res.data;

      const decodedToken = jwtDecode<DecodedToken>(token);

      // ✅ Lưu vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("name", decodedToken.name || "");
      localStorage.setItem("role", decodedToken.role);
      localStorage.setItem("id", decodedToken.id);
      if (decodedToken.skin_type) {
        localStorage.setItem("skin_type", decodedToken.skin_type);
      }

      return {
        id: decodedToken.id,
        token,
        email: decodedToken.email,
        name: decodedToken.name,
        role: decodedToken.role,
        skin_type: decodedToken.skin_type,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Đăng ký thất bại");
    }
  }
);

// =========================
// LOGOUT
// =========================
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("id");
  localStorage.removeItem("skin_type");
  return {};
});

// =========================
// INITIAL STATE
// =========================
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// =========================
// SLICE
// =========================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Đăng nhập thất bại";
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Đăng ký thất bại";
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
