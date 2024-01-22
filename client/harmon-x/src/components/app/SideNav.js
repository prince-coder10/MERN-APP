import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

function SideNav() {
  return (
    <div className="goat-nav">
      <div className="side-nav-container">
        <div className="Logo-cont">
          <img
            src={process.env.PUBLIC_URL + "/images/harmonX.svg"}
            alt="Logo"
            className="Logo"
          />
          <h1>HarmonX</h1>
        </div>
        <div className="side-nav=links">
          <div className="public-space">
            <h2 className="label">Public space</h2>
            <div className="public-links">
              <Link to="/dashboard" className="public-link">
                <button>
                  <i class="fa-solid fa-chart-simple i"></i>
                  Dashboard
                </button>
              </Link>
              <Link to="/health" className="public-link">
                <button>
                  <i class="fa-solid fa-notes-medical i"></i>
                  Health
                </button>
              </Link>
              <Link to="/forum" className="public-link">
                <button>
                  <i class="fa-regular fa-comments i"></i>
                  Forum
                </button>
              </Link>
              <Link to="/learn" className="public-link">
                <button>
                  <i class="fa-solid fa-book-open i"></i>
                  Learn
                </button>
              </Link>
            </div>
          </div>
          <div className="private-space">
            <h2>Personal</h2>
            <div className="private-links">
              <Link to="s" className="public-link">
                <button>
                  <i class="fa-regular fa-bell i"></i>
                  Notifications
                </button>
              </Link>
              <Link to="s" className="public-link">
                <button>
                  <i class="fa-solid fa-gear i"></i>
                  Settings
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="user-profile">
          <span className="user-icon">
            <i class="fa-solid fa-user"></i>
          </span>
          <span className="user-info">
            <p className="User-name">Prince Mbakwe</p>
            <p className="email">princelycoding.org@gmail.com</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
