export type Wishlist = {
  id: string;
  userId: string;
};

export type RefreshToken = {
  id: string;
  hashed_token: string;
  userId: string;
  revoked: boolean;
  created_at: string;
  updated_at: string;
  expire_at: string;
};

export interface User {
  message: string;
  userData: {
    id: string;
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
    wishlist?: Wishlist;
    refresh_token: RefreshToken[];
    created_at: string;
    updated_at: string;
  };
}


