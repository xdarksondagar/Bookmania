import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "../utils/enum";
import { Login } from "./../pages/Login/Login";
import { Register } from "./../pages/Register/Register";
import { useAuthContext } from "../context/auth";
import { BookListing } from "../pages/Booklisting/index";
import { Book } from "../pages/Book";
import { EditBook } from "../pages/Book/editBook";
import { User } from "../pages/User";
import { EditUser } from "../pages/User/editUser";
import { Category } from "../pages/Category";
import { EditCategory } from "../pages/Category/editCategory";
import { UpdateProfile } from "../pages/Upadate-Profile";

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
      <Route
        exact
        path={routePaths.EditBook}
        element={authContext.user.id ? <EditBook /> : Redirect}
      ></Route>
      <Route
        exact
        path={routePaths.AddBook}
        element={authContext.user.id ? <EditBook /> : Redirect}
      ></Route>

      <Route
        exact
        path={routePaths.User}
        element={authContext.user.id ? <User /> : Redirect}
      ></Route>
      <Route
        exact
        path={routePaths.EditUser}
        element={authContext.user.id ? <EditUser /> : Redirect}
      ></Route>

      <Route
        exact
        path={routePaths.Category}
        element={authContext.user.id ? <Category /> : Redirect}
      ></Route>
      <Route
        exact
        path={routePaths.EditCategory}
        element={authContext.user.id ? <EditCategory /> : Redirect}
      ></Route>
      <Route
        exact
        path={routePaths.AddCategory}
        element={authContext.user.id ? <EditCategory /> : Redirect}
      ></Route>

      <Route
        exact
        path={routePaths.UpdateProfile}
        element={authContext.user.id ? <UpdateProfile /> : Redirect}
      ></Route>
    </Routes>
  );
};
