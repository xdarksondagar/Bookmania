import { Route, Routes } from "react-router-dom";
import { routePaths } from "../utils/enum";
import { Login } from "./../pages/Login/Login";
import { Register } from "./../pages/Register/Register";
import { useAuthContext } from "../context/auth";

export const MainNavigation = () => {
  const authContext = useAuthContext();
  return (
    <Routes>
      <Route exact path={routePaths.Login} element={<Login />}></Route>
      <Route exact path={routePaths.Register} element={<Register />}></Route>
    </Routes>
  );
};
