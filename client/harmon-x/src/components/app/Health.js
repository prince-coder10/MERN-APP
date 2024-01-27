import React from "react";
import SideNav from "./SideNav";
import Navbar from "../Navbar";

function Health() {
  return (
    <div className="app-container">
      <Navbar show={false} />
      <SideNav />
      <h1>Stay Healthy</h1>
    </div>
  );
}

export default Health;
