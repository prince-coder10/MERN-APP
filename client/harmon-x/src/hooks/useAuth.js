import { useContext } from "react";
import userContext from "../context/userContext";

const useAuth = () => {
  return useContext(userContext);
};

export default useAuth;
