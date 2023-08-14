import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import shared from "../utils/shared";
import { routePaths } from "./../utils/enum";
import { toast } from "react-toastify";

const initialUserValues = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  role: "",
  roleId: 0,
  password: "",
};

const initialState = {
  setUser: () => {},
  user: initialUserValues,
  signOut: () => {},
  appInitialize: false,
};

export const AuthContext = createContext(initialState);

export const AuthWrapper = ({ children }) => {
  const [appInitialize, setAppInitialize] = useState(false);
  const [user, _setUser] = useState(initialUserValues);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const setUser = (user) => {
    localStorage.setItem(shared.LocalStorageKeys.USER, JSON.stringify(user));
    _setUser(user);
  };

  // If user already logged in
  useEffect(() => {
    const itemStr =
      JSON.parse(localStorage.getItem(shared.LocalStorageKeys.USER)) ||
      initialUserValues;

    if (!itemStr.id) {
      navigate(`${routePaths.Login}`);
    }
    _setUser(itemStr);
  }, []);

  const signOut = () => {
    localStorage.removeItem(shared.LocalStorageKeys.USER);
    _setUser(initialUserValues);
    navigate(`${routePaths.Login}`);
  };

  // if user try to enter pathname of unauthorized page
  useEffect(() => {
    if (pathname === routePaths.Login && user.id) {
      navigate(routePaths.BookListing);
    }

    if (!user.id) return;

    const access = shared.hasAccess(pathname, user);

    if (!access) {
      toast.error("Sorry, you are not authorized to access this page");
      navigate(routePaths.BookListing);
      return;
    }

    setAppInitialize(true);
  }, [pathname, user]);

  let values = { user, setUser, signOut, appInitialize };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
