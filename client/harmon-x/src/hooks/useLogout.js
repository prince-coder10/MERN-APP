import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const useLogout = () => {
  const { setUser } = useAuth(); // Assuming useAuth provides setUser
  const logout = async () => {
    setUser(null); // Set the user state to null or an initial value
    try {
      const response = await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
