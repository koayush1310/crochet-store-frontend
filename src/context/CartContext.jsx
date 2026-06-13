import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext =
  createContext();

export const CartProvider = ({
  children,
}) => {
  const [cartItems,
    setCartItems] =
    useState([]);

  useEffect(() => {
    const savedCart =
      localStorage.getItem(
        "cart"
      );

    if (savedCart) {
      setCartItems(
        JSON.parse(savedCart)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems
      )
    );
  }, [cartItems]);

  const addToCart = (
    product
  ) => {
    const exists =
      cartItems.find(
        (item) =>
          item._id ===
          product._id
      );

    if (exists) {
      setCartItems(
        cartItems.map(
          (item) =>
            item._id ===
            product._id
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    1,
                }
              : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart =
    (id) => {
      setCartItems(
        cartItems.filter(
          (item) =>
            item._id !== id
        )
      );
    };

  const increaseQty =
    (id) => {
      setCartItems(
        cartItems.map(
          (item) =>
            item._id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    1,
                }
              : item
        )
      );
    };

  const decreaseQty =
    (id) => {
      setCartItems(
        cartItems.map(
          (item) =>
            item._id === id
              ? {
                  ...item,
                  quantity:
                    Math.max(
                      1,
                      item.quantity -
                        1
                    ),
                }
              : item
        )
      );
    };

  const clearCart = () => {
    setCartItems([]);
  };

  const total =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);