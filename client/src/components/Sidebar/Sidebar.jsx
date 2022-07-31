import React, { useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SidebarItemsUpper, SidebarItemsLower } from "./SidebarItems";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import EventBus from "../../common/EventBus";

function Sidebar(props) {
  // Using useLocation hook to get the current pathname and set the active class on the current path
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const logOut = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <>
      <nav className="nav-menu active">
        <ul className="nav-menu-items nav-upper">
          {SidebarItemsUpper.map((item, index) => {
            
            return (
              <li key={index} className={item.cName}>
                <Link
                  to={item.path}
                  className={
                    splitLocation[1] === item.name ? "active-link" : ""
                  }
                >
                  <span
                    className={
                      splitLocation[1] === item.name
                        ? "link-item active-ellipse"
                        : "link-item icon-ellipse"
                    }
                  >
                    {" "}
                    <img src={item.icon} alt="" />{" "}
                  </span>
                  <span className="link-name-span">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="nav-menu-items nav-lower">
          {SidebarItemsLower.map((item, index) => {
            if (item.name === "logout") {
              return (
                <li key={index} className={item.cName}>
                  <button
                    className={
                      splitLocation[1] === item.name ? "active-link" : ""
                    }
                    onClick={logOut}
                  >
                    <span
                      className={
                        splitLocation[1] === item.name
                          ? "link-item active-ellipse"
                          : "link-item icon-ellipse"
                      }
                    >
                      {" "}
                      <img src={item.icon} alt="" />{" "}
                    </span>
                    <span className="link-name-span">{item.title}</span>
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
