import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Products } from "./Products";
import { Home } from "./Home";
import { Contact } from "./Contact";
import { NavBar } from "./component/NavBar/NavBar";
import { Footer } from "./component/Footer/Footer";
import { Register } from "./pages/Register/Register";
import { theme } from "./theme/index";
import { Login } from "./pages/Login/Login";

function App() {
  let navlinks = ["register", "login", "products", "contact"];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <NavBar navs={navlinks} />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

// GECG_200130116009_Manthan_Sondagar
