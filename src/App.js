import "./App.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { Products } from "./Products";
import { Home } from "./Home";
import { User } from "./User";
import { Contact } from "./Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavLink to="/">
            <h1>BookMania</h1>
          </NavLink>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              listStyle: "none",
              gap: "10px",
            }}
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/user">User</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/user"
            element={<User firstName="John" lastName="Doe" />}
          ></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// GECG_200130116009_Manthan_Sondagar
