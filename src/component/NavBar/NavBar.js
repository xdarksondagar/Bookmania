import { NavLink } from "react-router-dom";
import { useStyle } from "./style";

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
      <h2>BookMania</h2>
      <ul>{listItems}</ul>
    </header>
  );
};
