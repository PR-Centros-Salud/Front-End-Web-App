import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// This is the hook that will be used to access the auth state and the login and logout functions.
const useAuth = () => useContext(AuthContext);

export default useAuth;