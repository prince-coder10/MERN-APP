import React, { useState } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Login.css";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/dashboard";
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const response = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        const accessToken = response.data.accessToken;

        try {
          // Verify the accessToken
          const verifyResponse = await axios.post(
            "/verify",
            {
              accessToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          console.log(verifyResponse.data.accessToken);

          // Assuming verifyResponse.data.accessToken is a string, you can use it accordingly
          const verifiedAccessToken = verifyResponse.data.accessToken;
          const userName = response?.data?.user.name;
          const userEmail = response?.data?.user.email;
          const roles = response?.data?.user?.roles;

          // Update the user context or perform any other action with the access token
          setUser({
            accessToken: verifiedAccessToken,
            userName,
            userEmail,
            roles,
            // ... other user data if needed
          });
        } catch (verifyError) {
          console.error("Error verifying token:", verifyError);
          toast.error("Error verifying access token");
        }

        setData({});
        toast.success("Login successful. Welcome Back 🎉");
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error?.res) {
        toast.error("No Server Response");
      }
      console.error(error);
    }
  };

  return (
    <>
      <Navbar show={true} />
      <div className="login-body">
        <div id="login-container" className="login-container">
          <div className="login-icons">
            <img
              src={process.env.PUBLIC_URL + "/images/Coffee.png"}
              alt="coffee"
              className="coffee"
            />
            <img
              src={process.env.PUBLIC_URL + "/images/Rectangle.png"}
              alt="rectangle"
            />
          </div>
          <div className="welcome-text">
            <h2>Great to have you back!</h2>
            <i className="fa-regular fa-sun fa-xl"></i>
          </div>
          <form
            onSubmit={loginUser}
            method="POST"
            action="/login"
            encType="application/x-www-form-urlencoded"
          >
            <h3>Login</h3>
            <p className="custom-label">Email</p>
            <input
              type="email"
              placeholder="enter email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <p className="custom-label">Password</p>
            <input
              type="password"
              placeholder="enter password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <p className="form-link-cont">
              <Link to="#" className="formLink">
                Forgot password?
              </Link>
            </p>
            <button type="submit">Login</button>
            <p className="form-link-cont">
              No account &nbsp;
              <Link to="/signup" className="form-link">
                sign up
              </Link>
            </p>
          </form>
          <i className="fa-regular fa-lightbulb fa-xl bulb"></i>
          <div className="circle"></div>
        </div>
      </div>
      <Footer show={true} />
    </>
  );
}

export default Login;
