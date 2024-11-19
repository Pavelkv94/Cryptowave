import axios, { AxiosResponse } from "axios";

export const API_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || "";
    try {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    } catch (e) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originRequest = error.config;
        if (error.response.status === 401 && !originRequest._isRetry) {
            try {
                await refreshAccessToken();
                return axiosInstance.request(originRequest);
            } catch (error) {
                console.error("Token refresh failed:", error);
                await logoutUser();
            }
        }
        throw error;
    }
);

const refreshAccessToken = async (): Promise<string> => {
    const response: AxiosResponse = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
    const newToken = response.data.accessToken;
    localStorage.setItem("token", newToken);
    return newToken;
};

export const logoutUser = async () => {
    localStorage.removeItem("token");
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};

export default axiosInstance;
