import React,{useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashbaord/Dashboard";
import { Profile } from "../../pages/Profile";
import { Projects } from "../../pages/Projects";
import { Report } from "../../pages/Report";
import SignIn from "../../pages/SignIn/SignIn";
import SignUp from "../../pages/SignUp/SignUp";
import { Skills } from "../../pages/Skills";

import { useDispatch, useSelector } from "react-redux";

import { clearMessage } from "../../actions/message";

import { history } from "../../helpers/history";


function MyRoutes() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  
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
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
