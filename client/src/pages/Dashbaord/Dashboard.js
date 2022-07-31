import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user: currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [currentUser]);
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Dashboard;
