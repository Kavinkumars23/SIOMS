import axios from 'axios';

// You can adjust this later for different environments
const api = axios.create({
  baseURL: 'https://localhost:7002/api', // your IdentityService API
});
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // or from Redux if needed
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized — maybe redirect to login?");
        // Optionally: clear localStorage, redirect, or dispatch logout
      }
      return Promise.reject(error);
    }
  );

  export default api;