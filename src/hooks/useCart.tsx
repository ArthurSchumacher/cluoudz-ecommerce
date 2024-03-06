import { ProductToCartDto } from "@/types/cart";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type CartContextType = {
  cartTotalQuantity: number;
  cartProducts: ProductToCartDto[] | null;
  handleAddProductToCart: (product: ProductToCartDto) => void;
  handleRemoveProductFromCart: (product: ProductToCartDto) => void;
  handleCartQtyIncrease: (product: ProductToCartDto) => void;
  handleCartQtyDecrease: (product: ProductToCartDto) => void;
  handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<ProductToCartDto[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("CartItems");
    const cProducts: ProductToCartDto[] | null = JSON.parse(cartItems);

    setCartProducts(cProducts);
  }, []);

  const handleAddProductToCart = useCallback((product: ProductToCartDto) => {
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
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: ProductToCartDto) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.productId !== product.productId;
        });

        setCartProducts(filteredProducts);
        localStorage.setItem("CartItems", JSON.stringify(filteredProducts));
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: ProductToCartDto) => {
      let updatedCart;

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex((item) => {
          return item.productId === product.productId;
        });

        if (existingIndex > -1) {
          updatedCart[existingIndex].amount = ++updatedCart[existingIndex]
            .amount;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("CartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: ProductToCartDto) => {
      let updatedCart;

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex((item) => {
          return item.productId === product.productId;
        });

        if (existingIndex > -1) {
          updatedCart[existingIndex].amount = --updatedCart[existingIndex]
            .amount;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("CartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQuantity(0);
    localStorage.setItem("CartItems", JSON.stringify(null));
  }, []);

  const value = {
    cartTotalQuantity,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
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
