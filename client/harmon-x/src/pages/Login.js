import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login sucessful. Welcome Back 🎉");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login-container">
      <form
        onSubmit={loginUser}
        method="POST"
        action="/login"
        encType="application/x-www-form-urlencoded"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="enter email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="enter password"
          name="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
