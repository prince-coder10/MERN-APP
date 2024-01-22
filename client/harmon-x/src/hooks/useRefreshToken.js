import { useState } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { user, setUser } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", { withCredentials: true });
      const newAccessToken = response.data.accessToken;

      setUser((prev) => ({
        ...prev,
        accessToken: newAccessToken,
      }));

      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; // Propagate the error up if needed
    }
  };

  return { refresh, accessToken: user.accessToken };
}

export default useRefreshToken;
