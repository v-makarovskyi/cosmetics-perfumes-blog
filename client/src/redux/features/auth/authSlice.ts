import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@client_types/clientTypes";

interface AuthState {
  existUser: Partial<User['userData']> | undefined;
}

const initialState = {
  existUser: undefined,
} satisfies AuthState as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, { payload }: PayloadAction<AuthState['existUser']>) => {
      state.existUser = payload
    },
   userLoggedOut: (state) => {
      state.existUser = undefined;
    }, 
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
