import React, { useState } from "react";
import "../layout.css";
// import { icons } from "antd/es/image/PreviewGroup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const usermenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-3-line",
    },

    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-2-line",
    },

    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-heart-pulse-fill",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-fill",
    },

    // {
    //   name: "Logout",
    //   path: "/logout",
    //   icon: "ri-logout-circle-r-line",
    // },
  ];

  const adminmenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-3-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-4-line",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "ri-heart-pulse-fill",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-fill",
    },

    // {
    //   name: "Logout",
    //   path: "/logout",
    //   icon: "ri-logout-circle-r-line",
    // },
  ];

  const menutoRendered = user?.isAdmin ? adminmenu : usermenu;

  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">{`${collapsed ? "SF" : "StayF!t"}`}</h1>
          </div>

          <div className="menu">
            {menutoRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-r-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenMessage.length}
                onClick={() => navigate("/messages")}
              >
                <i className="ri-notification-badge-line header-action-icon px-2"></i>
              </Badge>
              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
