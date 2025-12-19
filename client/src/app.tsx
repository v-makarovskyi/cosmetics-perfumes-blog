import React, { useState } from "react";
import { Routes, Route } from "react-router";
import { Home } from "@src/pages/home";
import { RegisterPage } from "./pages/register";
import { LoginPage } from "./pages/login";
import { SingleBlogPage } from "./pages/single-blog-page";
import { RootLayout } from "@src/layout/root-layout";
import { CategoryPage } from "./pages/category-page";
import { ProfilePage } from "./pages/profile-page";
import { BlogsSearchResultsPage } from "./pages/blogs-search-results-page";

import "./main-scss-app.scss";


function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterPage />} /> *
          <Route path="login" element={<LoginPage />} />
          <Route
            path="categories/:categorySlug/:subCategoriesSlug?"
            element={<CategoryPage />}
          />
          <Route
            path="blogs/:categorySlug/blog-detail/:blogSlug"
            element={<SingleBlogPage />}
          ></Route>
          <Route
            path="blogs/search/:searchData"
            element={<BlogsSearchResultsPage />}
          />
          <Route path="users/profile/:id" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
