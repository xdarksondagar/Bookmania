import { Route, Routes } from "react-router-dom";
import { Home } from "@material-ui/icons";
import { routePaths } from "../utils/enum";
import { Login } from "./../pages/Login/Login";
import { Register } from "./../pages/Register/Register";
import { Products } from "./../Products";
import { Contact } from "./../Contact";

export const MainNavigation = () => {
  return (
    <Routes>
      <Route path={routePaths.home} element={<Home />}></Route>
      <Route path={routePaths.login} element={<Login />}></Route>
      <Route path={routePaths.register} element={<Register />}></Route>
      <Route path={routePaths.products} element={<Products />}></Route>
      <Route path={routePaths.contact} element={<Contact />}></Route>
    </Routes>
  );
};
