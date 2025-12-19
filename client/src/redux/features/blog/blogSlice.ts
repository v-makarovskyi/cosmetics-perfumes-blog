import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { Blog } from "@client_types/clientTypes";

interface BlogState {
  blogsDataForHeader: Array<Blog> | undefined;
  blogsDataForSidebar: Array<Blog> | undefined;
}

const initialState: BlogState = {
  blogsDataForHeader: [],
  blogsDataForSidebar: [],
};

const blogSlice = createSlice({
  name: "blogsDataForParts",
  initialState,
  reducers: {
    getBlogsDataForHeader: (
      state,
      { payload }: PayloadAction<BlogState["blogsDataForHeader"]>
    ) => {
      state.blogsDataForHeader = payload;
    },
    getBlogsDataForSidebar: (
      state,
      { payload }: PayloadAction<BlogState["blogsDataForSidebar"]>
    ) => {
      state.blogsDataForSidebar = payload;
    },
  },
});

export const { getBlogsDataForHeader, getBlogsDataForSidebar } =
  blogSlice.actions;
export default blogSlice.reducer;
