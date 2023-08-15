import { useState, useEffect, useMemo } from "react";
import { useAuthContext } from "./../../context/auth";
import { productListingStyle } from "./style";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { defaultFilter } from "../../constant/constant";
import { materialCommonStyles } from "../../utils/materialCommonStyle";
import { Pagination } from "@material-ui/lab";
import bookService from "./../../service/book-service";
import categoryService from "./../../service/category-service";

export const BookListing = () => {
  const authContext = useAuthContext();
  const classes = productListingStyle();
  const materialClasses = materialCommonStyles();
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState(defaultFilter);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => setBookResponse(res));
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) setCategories(res);
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((book) => {
        book.category = categories.find((a) => a.id === book.categoryId)?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);

  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) return e.target.value === "a-z" ? -1 : 1;
      if (a.name > b.name) return e.target.value === "a-z" ? 1 : -1;
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  };

  return (
    <div className={classes.productListWrapper}>
      <div className="container">
        <Typography variant="h1">Book Listing</Typography>
        <Grid container className="title-wrapper">
          <Grid item xs={6}>
            <Typography variant="h2">
              Total <span>- {bookResponse.totalItems} items</span>
            </Typography>
          </Grid>
          <div className="dropdown-wrapper">
            <TextField
              id="text"
              name="text"
              className="dropdown-wrapper"
              placeholder="Search..."
              variant="outlined"
              inputProps={{ className: "small" }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
          </div>
          <FormControl className="dropdown-wrapper" variant="outlined">
            <InputLabel htmlFor="select">Sort By</InputLabel>
            <Select
              className={materialClasses.customSelect}
              MenuProps={{ classes: { paper: materialClasses.customSelect } }}
              onChange={sortBooks}
              value={sortBy}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            {books.map((book, index) => (
              <div className="product-list" key={index}>
                <div className="product-list-inner">
                  <em>
                    <img
                      src={book.base64image}
                      className="image"
                      alt="dummy_Image"
                    />
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3">{book.name}</Typography>
                    <span className="category">{book.category}</span>
                    <p className="description">{book.description}</p>
                    <p className="price">
                      <span className="discount-price">
                        MRP &#8377; {book.price}
                      </span>
                    </p>
                    <button className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-disableElevation btn primary-btn">
                      <span className="MuiButton-label" onClick={() => {}}>
                        ADD TO CART
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination-wrapper">
          <Pagination
            count={bookResponse.totalPages}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          />
        </div>
      </div>
    </div>
  );
};
