import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/app/RequireAuth";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import Footer from "./components/Footer";
import Dashboard from "./components/app/Dashboard";
import Health from "./components/app/Health";
import Forum from "./components/app/Forum";
import Learn from "./components/app/Learn";

// Add Axios error handling

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      {/* Public routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* Protected routes */}
      <Routes>
        {/* <Route element={<RequireAuth allowedRoles={[2093]} />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health" element={<Health />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/learn" element={<Learn />} />
        {/* </Route> */}
      </Routes>
      <Footer />
    </UserContextProvider>
  );
}

export default App;
