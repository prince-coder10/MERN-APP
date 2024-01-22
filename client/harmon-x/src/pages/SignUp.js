import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SignUp() {
  const USER_REGEX = /^[a-zA-Z]{1,5}( [a-zA-Z]{1,22}){1}$/;

  const [validName, setValidName] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [nameTyped, setNameTyped] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post(
        "/signup",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Signup successful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setErrorMsg((prevMsg) => {
      if (validName || !nameTyped) {
        return "";
      } else {
        return "Must start with a letter (lowercase or uppercase), contain only letters and a space, and must be between 3-23 characters";
      }
    });
  }, [validName, nameTyped]);

  useEffect(() => {
    const result = USER_REGEX.test(data.name);
    setValidName(result);
  }, [data.name]);

  const handleNameFocus = () => {
    setNameTyped(true);
  };

  // Rest of your component code...

  return (
    <>
      <Navbar show={true} />
      <div className="login-body">
        <p className={errorMsg ? "error-msg" : "offscreen"}>{errorMsg}</p>
        <div className="login-container">
          <div className="login-icons">
            <i className="fa-regular fa-envelope fa-xl coffee "></i>
            <img
              src={process.env.PUBLIC_URL + "/images/Rectangle.png"}
              alt="rectangle"
            />
          </div>
          <div className="welcome-text">
            <h2>Welcome! First things first...</h2>
            <i className="fa-regular fa-sun fa-xl"></i>
          </div>
          <form onSubmit={registerUser}>
            <h3>Sign Up</h3>
            <label className="custom-label" htmlFor="name">
              Name
            </label>
            <input
              id="fullname-user"
              type="text"
              placeholder="enter full name"
              autoComplete="off"
              value={data.name}
              required
              aria-invalid={validName ? "false" : "true"}
              onChange={(e) =>
                setData({ ...data, name: e.target.value }, handleNameFocus())
              }
            />
            <label className="custom-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="enter email"
              name="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label className="custom-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="enter password"
              name="password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button type="submit">Sign up</button>
            <p className="form-link-cont">
              already have an account &nbsp;
              <Link to="/login" className="form-link">
                login
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

export default SignUp;
