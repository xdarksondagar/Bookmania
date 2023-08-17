import cartService from "./../service/cart-service";
import { Role, routePaths } from "./enum";

const addToCart = async (book, id) => {
  return cartService
    .add({ userId: id, bookId: book.id, quantity: 1 })
    .then((res) => {
      return { error: false, message: "Item added in cart" };
    })
    .catch((e) => {
      if (e.status === 500)
        return { error: true, message: "Item already in the cart" };
      else return { error: true, message: "something went wrong" };
    });
};

const messages = {
  USER_DELETE: "Are you sure you want to delete this user?",
  UPDATED_SUCCESS: "Record updated successfully",
  UPDATED_FAIL: "Record cannot be updated",
  DELETE_SUCCESS: "Record deleted successfully",
  DELETE_FAIL: "Record cannot be deleted",
  ORDER_SUCCESS: "Your order is successfully placed",
};

const LocalStorageKeys = {
  USER: "user",
};

const NavigationItems = [
  {
    name: "Users",
    route: routePaths.User,
    access: [Role.Admin],
  },
  {
    name: "Categories",
    route: routePaths.Category,
    access: [Role.Admin],
  },
  {
    name: "Books",
    route: routePaths.Book,
    access: [Role.Admin, Role.Seller],
  },
  {
    name: "Update Profile",
    route: routePaths.UpdateProfile,
    access: [Role.Admin, Role.Buyer, Role.Seller],
  },
];

const hasAccess = (pathname, user) => {
  const navItem = NavigationItems.find((navItem) =>
    pathname.includes(navItem.route)
  );
  if (navItem) {
    return (
      !navItem.access ||
      !!(navItem.access && navItem.access.includes(user.roleId))
    );
  }
  return true;
};

export default {
  addToCart,
  hasAccess,
  messages,
  LocalStorageKeys,
  NavigationItems,
};
