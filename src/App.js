import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { theme } from "./utils/theme";
import { Footer } from "./component/Footer/Footer";
import { MainNavigation } from "./component/MainNavigation";
import loader from "./assets/images/loader.gif";
import { Header } from "./component/Header/Header";
import { AuthWrapper } from "./context/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <div className="loader-wrapper">
            <img src={loader} alt="loader" />
          </div>
          <Header />
          <main>
            <MainNavigation />
          </main>
          <Footer />
        </ThemeProvider>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;

// GECG_200130116009_Manthan_Sondagar
