import React, { useEffect, useCallback } from "react";
import useLogout from "../../hooks/useLogout";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Dashboard.css";
import SideNav from "./SideNav";
function Dashboard() {
  // const { refresh } = useRefreshToken();
  // const { user } = useAuth();
  // const navigate = useNavigate();
  // const logout = useLogout();
  // const axiosPrivate = useAxiosPrivate();
  // const location = useLocation();

  // const getTeachers = useCallback(async () => {
  //   try {
  //     const response = await axiosPrivate.get("/teachers");
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error(err);
  //     navigate("/login", { state: { from: location }, replace: true });
  //   }
  // }, [axiosPrivate, navigate, location]);

  // const signOut = async () => {
  //   await logout();
  //   navigate("/");
  // };

  // useEffect(() => {
  //   const controller = new AbortController();

  //   getTeachers();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [getTeachers]);

  // useEffect(() => {
  //   console.log("Axios Instance:", axiosPrivate);
  // }, [axiosPrivate]);

  return (
    <div className="app-container">
      <Navbar show={false} />
      <SideNav />
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <input type="search" id="search" />
        </header>
        {/* <button onClick={signOut}>Sign Out</button>
      <button onClick={() => refresh()}>Refresh</button>
      <button onClick={getTeachers}>Get Teachers</button> */}
      </div>
      <Footer show={false} />
    </div>
  );
}

export default Dashboard;
