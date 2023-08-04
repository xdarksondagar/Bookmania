import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Footer } from "./component/Footer/Footer";
import { NavBar } from "./component/NavBar/NavBar";
import { theme } from "./theme/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainNavigation } from "./component/MainNavigation";

function App() {
  let navlinks = ["register", "login", "products", "contact"];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <NavBar navs={navlinks} />
            <MainNavigation />
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

// GECG_200130116009_Manthan_Sondagar
