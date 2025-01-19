import { useQuery } from "@tanstack/react-query";
import useContextt from "../hooks/useContext";
import useAxiosSecure from "./useAxiosSecure";
const useAdminn = () => {
  const { user } = useContextt();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/admin/${user.email}`);
      console.log(response.data);
      return response.data?.admin;
    },
  });
  return [isAdmin];
};

export default useAdminn;
