import React from "react";
import { Routes, Route } from "react-router";
import { Home } from "@src/pages/home";
import { RegisterPage } from "./pages/register";
import { LoginPage } from "./pages/login";
import { RootLayout } from "@src/layout/root-layout";

import "./main-scss-app.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
