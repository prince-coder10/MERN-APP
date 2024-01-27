// import axios from "axios";
// import useRefreshToken from "./hooks/useRefreshToken";
// import useAuth from "./hooks/useAuth";

// axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.withCredentials = true;
// const { user } = useAuth();

// const { refresh } = useRefreshToken();

// useEffect(() => {
//   const responseIntercept = axios.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const prevRequest = error?.config;
//       if (error?.response?.status === 403 && !prevRequest?.sent) {
//         prevRequest.sent = true;
//         const newAccessToken = await refresh();
//         prevRequest.headers["acessToken"] = newAccessToken;
//         return axios(prevRequest);
//       }
//       console.error("Axios Error:", error);
//       return Promise.reject(error);
//     }
//   );
// }, [user, refresh]);

import axios from "axios";
const baseURL = "http://localhost:8000";

export default axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
