import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = ({ show }) => {
  return show ? (
    <footer>
      <div className="row">
        <div className="col">
          <img
            src={process.env.PUBLIC_URL + "/images/harmonX.svg"}
            alt="logo"
            className="footer-logo"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            in velit sint, perspiciatis debitis veritatis vero sequi est tempora
            deserunt aut magni vel dolorum necessitatibus. Corporis voluptatibus
            dolor fugit. Quibusdam.
          </p>
        </div>
        <div className="col">
          <h3>
            Account
            <div className="underline">
              <span></span>
            </div>
          </h3>

          <p className="ft-p">
            <Link to="/login" className="footer-link">
              Login
            </Link>
          </p>
          <p className="ft-p">
            <Link to="/signup" className="footer-link">
              SignUp
            </Link>
          </p>
        </div>
        <div className="col">
          <h3>
            Links
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul>
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="#about" className="footer-link">
                About
              </Link>
            </li>
            <li>
              <Link to="#contact" className="footer-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>
            Newsletter
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <form>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="newsletter-input"
            />
            <button type="submit">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
      <hr />
      <p className="copyright">CodeNexus &copy; 2024 - All Rights Reserved</p>
    </footer>
  ) : null;
};

export default Footer;
