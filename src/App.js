import "./App.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Products } from "./Products";
import { Home } from "./Home";
import { User } from "./User";
import { Contact } from "./Contact";
import { NavBar } from "./component/NavBar/NavBar";
import { Footer } from "./component/Footer/Footer";
import { Register } from "./pages/Register/Register";
import { theme } from "./theme/index";

function App() {
  let navlinks = ["register", "user", "products", "contact"];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <NavBar navs={navlinks} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/user"
              element={<User firstName="John" lastName="Doe" />}
            ></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

// GECG_200130116009_Manthan_Sondagar
