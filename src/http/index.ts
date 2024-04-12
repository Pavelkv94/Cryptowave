import axios, { AxiosResponse } from "axios";

export const API_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || "";
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    return config;
});

axiosInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
       console.log(error);
       
        const originRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            try {
                const response = await axios.get<AxiosResponse>(`${API_URL}/api/auth/refresh`, { withCredentials: true });

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                localStorage.setItem("token", response.data.accessToken);
                return axiosInstance.request(originRequest);
            } catch (error) {
                console.log(error);
            }
        }
        throw error;
    }
);

export default axiosInstance;
