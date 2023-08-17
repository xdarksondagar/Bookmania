import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./auth";
import cartService from "./../service/cart-service";

const initialCartDetails = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

const cartContext = createContext(initialCartDetails);

export const CartWrapper = ({ children }) => {
  const authContext = useAuthContext();
  const [cartData, setCartData] = useState([]);

  const emptyCart = () => {
    setCartData([]);
  };

  const updateCart = (updatedCartList) => {
    if (updatedCartList) {
      setCartData(updatedCartList);
    } else {
      cartService.getList(authContext.user.id).then((res) => setCartData(res));
    }
  };

  useEffect(() => {
    updateCart();
  }, [authContext.user.id]);

  const value = {
    cartData,
    emptyCart,
    updateCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(cartContext);
};
