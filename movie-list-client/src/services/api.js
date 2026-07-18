import axios from "axios";

const api = axios.create({
  baseURL: "https://movie-watchlist-app-u2fw.onrender.com/",
  withCredentials: true, // important if you're using cookies later

});


api.interceptors.request.use((config) => {
  const token=localStorage.getItem("token");

  if(token){
    config.headers.Authorization=`Bearer ${token}`;
  }
  return config;
});
export default api;