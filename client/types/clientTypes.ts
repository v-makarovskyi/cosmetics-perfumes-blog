export type RefreshToken = {
  id: string;
  hashed_token: string;
  userId: string;
  revoked: boolean;
  created_at: string;
  updated_at: string;
  expire_at: string;
};

export type Tag = {
  id: string;
  title: string;
  blog?: Blog[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_image: string;
  blogs?: Blog[];
  created_at: string;
};

export type Blog = {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  main_image: string;
  description: string;
  tags?: Tag[];
  wishlist: Wishlist[];
  authorId: string;
  read_time: string;
  created_at: string;
  updated_at: string;
};

export interface Wishlist {
  id: string;
  userId: string;
  wishlist_blogs: Blog[];
}

/* export type ProfileUser = {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
  wishlist: Wishlist;
  profileName: string;
}; */

export interface User {
  message: string;
  userData: {
    id: string;
    name: string;
    email: string;
    password?: string;
    is_admin: boolean;
    wishlist?: Wishlist;
    refresh_token: RefreshToken[];
    created_at: string;
    updated_at: string;
    profileName?: string;
    user_image?: string | undefined;
  };
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  user_image?: string | undefined;
}
