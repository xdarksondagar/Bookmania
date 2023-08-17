import { AppBar, Button, List, ListItem, TextField } from "@material-ui/core";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { routePaths } from "./../../utils/enum";
import { useMemo, useState } from "react";
import shared from "../../utils/shared";
import siteLogo from "../../assets/images/site-logo.png";
import cartIcon from "../../assets/images/cart.png";
import searchIcon from "../../assets/images/search.png";
import bookService from "../../service/book-service";
import { useAuthContext } from "./../../context/auth";
import { headerStyle } from "./style";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/cart";

export const Header = () => {
  const classes = headerStyle();
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const open = false;
  const [query, setQuery] = useState("");
  const [booklist, setBooklist] = useState([]);
  const [openSearchRes, setOpenSearchRes] = useState(false);

  const navigate = useNavigate();

  // mobile menu
  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };

  const items = useMemo(() => {
    return shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authContext.user.roleId)
    );
  }, [authContext.user]);

  const logout = () => {
    authContext.signOut();
  };

  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setBooklist(res);
  };

  const search = () => {
    document.body.classList.add("search-results-open");
    searchBook();
    setOpenSearchRes(true);
  };

  const addToCart = (book) => {
    if (!authContext.user.id) {
      navigate(routePaths.Login);
      toast.error("Please login before adding books to cart");
    } else {
      shared.addToCart(book, authContext.user.id).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Item added to cart");
          cartContext.updateCart();
        }
      });
    }
  };

  return (
    <div className={classes.headerWrapper}>
      <AppBar className="site-header" id="header" position="static">
        <div
          className="top-header"
          style={{ display: open ? "none" : "block" }}
        ></div>
        <div className="bottom-header">
          <div className="container">
            <div className="header-wrapper">
              <div className="logo-wrapper">
                <Link
                  to={routePaths.BookListing}
                  className="site-logo"
                  title="logo"
                >
                  <img src={siteLogo} alt="logo" />
                </Link>
              </div>
              <div className="nav-wrapper">
                <List className="top-nav-bar">
                  {!authContext.user.id && (
                    <>
                      <ListItem>
                        <NavLink to={routePaths.Login} title="Login">
                          Login
                        </NavLink>
                      </ListItem>
                      <ListItem>
                        <NavLink to={routePaths.Register} title="Register">
                          Register
                        </NavLink>
                      </ListItem>
                    </>
                  )}
                  {items.map((item, index) => (
                    <ListItem key={index}>
                      <NavLink to={item.route} title={item.name}>
                        {item.name}
                      </NavLink>
                    </ListItem>
                  ))}
                </List>

                <List className="cart-country-wrap">
                  <ListItem className="cart-link">
                    <Link to={routePaths.Cart} title="Cart">
                      <img src={cartIcon} alt="cart_icon" />
                      Cart
                    </Link>
                  </ListItem>
                  <ListItem className="hamburger" onClick={openMenu}>
                    <span></span>
                  </ListItem>
                </List>

                {authContext.user.id && (
                  <List className="right">
                    <Button variant="outlined" onClick={() => logout()}>
                      Logout
                    </Button>
                  </List>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="search-overlay"
          onClick={() => {
            setOpenSearchRes(false);
            document.body.classList.remove("search-result-open");
          }}
        ></div>
        <div className="header-search-wrapper">
          <div className="container">
            <div className="header-search-outer">
              <div className="header-search-inner">
                <div className="text-wrapper">
                  <TextField
                    id="text"
                    name="text"
                    variant="outlined"
                    placeholder="What are you looking for..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  ></TextField>

                  {openSearchRes && (
                    <>
                      <div className="product-listing">
                        {booklist?.length === 0 && (
                          <p className="no-product">No product found</p>
                        )}

                        <List className="related-product-list">
                          {booklist.length > 0 &&
                            booklist.map((item, ind) => (
                              <ListItem key={ind}>
                                <div className="inner-block">
                                  <div className="left-col">
                                    <span className="title">{item.title}</span>
                                    <p>{item.description}</p>
                                  </div>
                                  <div className="right-col">
                                    <span className="price">{item.price}</span>
                                    <Link onClick={() => addToCart(item)}>
                                      Add to Cart
                                    </Link>
                                  </div>
                                </div>
                              </ListItem>
                            ))}
                        </List>
                      </div>
                    </>
                  )}
                </div>
                <Button
                  type="submit"
                  className="green-btn btn"
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={search}
                >
                  <em>
                    <img src={searchIcon} alt="search_icon" />
                  </em>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
};
