import axios from "axios";
import useLogout from "./hooks/useLogout";

const axiosConfig = () => {
    const handleLogout = useLogout();

    axios.defaults.baseURL = "http://localhost:3000"; // Default URL
    axios.defaults.headers.post['Content-Type'] = 'application/json'; // Default headers

    axios.interceptors.request.use(
        request => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                request.headers['Authorization'] = `Bearer ${token}`;
            }
            console.log(request);
            return request;
        },
        error => {
            console.log(error);
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        response => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = localStorage.getItem("refreshToken");
                if (refreshToken) {
                    try {
                        const response = await axios.post(`/refreshToken`, { refreshToken });
                        const newAccessToken = response.data.accessToken;
                        localStorage.setItem("accessToken", newAccessToken);
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        console.log(refreshError);
                        handleLogout();
                        return Promise.reject(refreshError);
                    }
                }
            }
            handleLogout();
            return Promise.reject(error);
        }
    );
};

export default axiosConfig;
