import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://medi-camp-hub-sever.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
