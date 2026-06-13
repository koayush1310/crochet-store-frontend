import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getWishlist,
  addToWishlist as addApi,
  removeFromWishlist as removeApi,
} from "../api/wishlistApi";

import { useAuth } from "./AuthContext";

const WishlistContext =
  createContext();

export const WishlistProvider =
  ({ children }) => {
    const { user } =
      useAuth();

    const [
      wishlistItems,
      setWishlistItems,
    ] = useState([]);

    const fetchWishlist =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {
            setWishlistItems(
              []
            );
            return;
          }

          const data =
            await getWishlist();

          setWishlistItems(
            data.wishlist
              ?.products || []
          );
        } catch (error) {
          console.error(
            "Wishlist Error:",
            error
          );
        }
      };

    useEffect(() => {
      fetchWishlist();
    }, [user]);

    const addWishlist =
      async (productId) => {
        try {
          await addApi(
            productId
          );

          await fetchWishlist();
        } catch (error) {
          console.error(
            error
          );
        }
      };

    const removeWishlist =
      async (productId) => {
        try {
          await removeApi(
            productId
          );

          await fetchWishlist();
        } catch (error) {
          console.error(
            error
          );
        }
      };

    const isWishlisted =
      (productId) => {
        return wishlistItems.some(
          (item) =>
            item._id ===
            productId
        );
      };

    return (
      <WishlistContext.Provider
        value={{
          wishlistItems,
          wishlistCount:
            wishlistItems.length,
          addWishlist,
          removeWishlist,
          fetchWishlist,
          isWishlisted,
        }}
      >
        {children}
      </WishlistContext.Provider>
    );
  };

export const useWishlist =
  () =>
    useContext(
      WishlistContext
    );