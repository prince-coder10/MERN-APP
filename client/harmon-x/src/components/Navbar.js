import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { handleLinkNavigate } from "../pages/scrollUtils";

function Navbar({ show }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return show ? (
    <>
      <div className={`nav-container ${isMenuOpen ? "open-nav" : "close-nav"}`}>
        <div className="logo-container">
          <img
            src={process.env.PUBLIC_URL + "/images/harmonX.svg"}
            alt="logo"
            className="Logo"
          />
          <h1>HarmonX</h1>
        </div>
        <nav className={`${isMenuOpen ? "open" : "close"}`}>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link
            to="/"
            onClick={(e) => handleLinkNavigate(e, "about")}
            className="nav-link"
          >
            About
          </Link>
          <Link
            to="/"
            onClick={(e) => handleLinkNavigate(e, "contact")}
            className="nav-link"
          >
            Contact
          </Link>
        </nav>
        <div className={`"authBtn" ${isMenuOpen ? "open" : "close"}`}>
          <button className="nav-btn">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </button>
          <button className="nav-btn" id="authBtn2">
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
      <button className="menu">
        <i
          className={`fa-solid fa-xl ${isMenuOpen ? "fa-times" : "fa-bars"} `}
          onClick={handleMenuClick}
        ></i>
      </button>
    </>
  ) : null;
}

export default Navbar;
