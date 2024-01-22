import { createContext, useState } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import axios from "../api/axios";

export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  // const axiosPrivate = useAxiosPrivate();
  // useEffect(() => {
  //   if (!user) {
  //     axios.get("/profile", { withCredentials: true }).then(({ data }) => {
  //       console.log(data, "hello");
  //       setUser(data);
  //     });
  //   }
  // }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default userContext;
