import { NavLink } from "react-router-dom";
import { useStyle } from "./style";
import logo from "../../assets/images/site-logo.png";

export const NavBar = ({ navs }) => {
  const classes = useStyle();

  let listItems = navs.map((el) => {
    return (
      <li key={el}>
        <NavLink to={"/" + el}>{el}</NavLink>
      </li>
    );
  });

  return (
    <header className={classes.header}>
      {logo ? (
        <img
          src={logo}
          alt="logo"
          style={{ maxWidth: "100%", height: "2.5rem" }}
        />
      ) : (
        <h2>BookMania</h2>
      )}
      <ul>{listItems}</ul>
    </header>
  );
};
