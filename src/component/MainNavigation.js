import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "../utils/enum";
import { Login } from "./../pages/Login/Login";
import { Register } from "./../pages/Register/Register";
import { useAuthContext } from "../context/auth";
import { BookListing } from "../pages/Booklisting/index";
import { Book } from "../pages/Book";

export const MainNavigation = () => {
  const authContext = useAuthContext();
  const Redirect = <Navigate to={routePaths.Login} />;

  return (
    <Routes>
      <Route exact path={routePaths.Login} element={<Login />}></Route>
      <Route exact path={routePaths.Register} element={<Register />}></Route>
      <Route
        exact
        path={routePaths.BookListing}
        element={authContext.user.id ? <BookListing /> : Redirect}
      ></Route>
      <Route
        exact
        path={routePaths.Book}
        element={authContext.user.id ? <Book /> : Redirect}
      ></Route>
    </Routes>
  );
};
