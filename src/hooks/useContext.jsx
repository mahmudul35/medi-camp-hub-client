import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
const useContextt = () => {
  return useContext(AuthContext);
};

export default useContextt;
