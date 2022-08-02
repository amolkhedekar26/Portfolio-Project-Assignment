import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashbaord/Dashboard";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";

import { Profile } from "../../pages/Profile";
import { Projects } from "../../pages/Projects";
import { Report } from "../../pages/Report";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import SignIn from "../../pages/SignIn/SignIn";
import SignUp from "../../pages/SignUp/SignUp";
import { Skills } from "../../pages/Skills";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/report" element={<Report />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:resetToken"
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
