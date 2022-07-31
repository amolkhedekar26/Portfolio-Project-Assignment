import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Dashboard from "../pages/Dashbaord/Dashboard";
import { Profile } from "../pages/Profile";
import { Projects } from "../pages/Projects";
import { Report } from "../pages/Report";
import SignIn from "../pages/SignIn/SignIn";
import { SignUp } from "../pages/SignUp";
import { Skills } from "../pages/Skills";

function MyRoutes() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<Dashboard />}>
    //       <Route index element={<Profile />} />
    //       <Route path="/profile" element={<Profile />} />
    //       <Route path="/skills" element={<Skills />} />
    //       <Route path="/projects" element={<Projects />} />
    //       <Route path="/report" element={<Report />} />
    //     </Route>
    //     <Route path="/login" element={<SignIn />} />
    //     <Route path="/signup" element={<SignUp />} />
    //   </Routes>
    //   </BrowserRouter>
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" exact element={<Profile />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
