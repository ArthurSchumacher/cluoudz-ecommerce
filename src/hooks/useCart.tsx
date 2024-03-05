import { AddItemToCartDto } from "@/types/cart";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  cartTotalQuantity: number;
  cartProducts: AddItemToCartDto[] | null;
  handleAddProductToCart: (product: AddItemToCartDto) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<AddItemToCartDto[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("CartItems");
    const cProducts: AddItemToCartDto[] | null = JSON.parse(cartItems);

    setCartProducts(cProducts);
  }, []);

  const handleAddProductToCart = useCallback(
    (product: AddItemToCartDto) => {
      setCartProducts((prev) => {
        let updatedCart;

        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }

        localStorage.setItem("CartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });
      setCartTotalQuantity(cartTotalQuantity + 1);
    },
    [cartTotalQuantity]
  );

  const value = {
    cartTotalQuantity,
    cartProducts,
    handleAddProductToCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
