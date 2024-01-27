// useAxiosPrivate.js

import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (user && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        console.log("Request Interceptor Config:", config);
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log("Response Interceptor Success:", response);
        return response;
      },
      async (error) => {
        console.error("Response Interceptor Error:", error);
        const originalRequest = error?.config;

        if (user && originalRequest?.retry && error?.response?.status === 403) {
          const responseData = error?.response?.data;

          // Check for logout
          if (error?.response?.status === 401) {
            console.log("Unauthorized. User may have logged out.");
            // Handle logout action, e.g., redirect to login page
            setUser(null);
            // You might want to navigate to the login page or handle the error in a way that makes sense for your application
            return Promise.reject(error);
          }

          // Additional conditions for retry
          if (responseData?.reason === "expired_token") {
            // Handle expired token case
            console.log("Token expired. Retrying with a new token.");
          } else if (responseData?.reason === "some_other_reason") {
            // Handle other specific reasons for retry
            console.log("Some other reason. Retrying...");
          }

          try {
            const newAccessToken = await refresh();
            console.log("New Access Token:", newAccessToken);

            // Update the Authorization header only if the user is still logged in
            if (user) {
              setUser((prevUser) => ({
                ...prevUser,
                accessToken: newAccessToken,
              }));
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              console.log("Retrying Original Request:", originalRequest);

              // Retry the original request with the new access token
              return axiosPrivate(originalRequest);
            } else {
              console.log("User is not authenticated. Abort retry.");
              return Promise.reject(error);
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [user, refresh, setUser]);

  return axiosPrivate;
};

export default useAxiosPrivate;
