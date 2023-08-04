import "./style.css";
import logo from "../../assets/images/site-logo.png";

export const Footer = () => {
  return (
    <>
      <footer>
        {logo ? (
          <img
            src={logo}
            alt="logo"
            style={{ maxWidth: "100%", height: "3rem" }}
          />
        ) : (
          <h2>BookMania</h2>
        )}
        <small>&copy; 2023 Tatvasoft.com. All rights reserved.</small>
      </footer>
    </>
  );
};
