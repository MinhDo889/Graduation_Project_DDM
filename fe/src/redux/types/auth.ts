export interface User {
  id: string; // CHAR(36)
  email: string;
  name?: string;
  role: "user" | "admin" | "super_admin";
  token?: string; // token có thể không có khi lấy data từ DB
  profile?: Profile; // quan hệ 1-1 với profile
}

export interface Profile {
  id: string;
  user_id: string;
  avatar_url?: string | null;
  phone_number?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  created_at?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
}

export interface Product {
  id: string; // CHAR(36)
  name: string;
  description?: string; // TEXT có thể null
  price: number; // DECIMAL(10,2)
  image_url?: string;
  stock?: number; // INTEGER, default 0
  rating?: number; // FLOAT, default 0
  skin_type?: "da_dau" | "da_kho" | "hon_hop" | "nhay_cam" | "tat_ca";
  created_by?: string | null; // id người tạo
  created_at?: Date;
  categories?: Category[];
}
