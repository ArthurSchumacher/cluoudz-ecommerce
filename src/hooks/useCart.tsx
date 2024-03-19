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
  cartTotalValue: number;
  cartProducts: ProductToCartDto[] | null;
  paymentIntent: string | null;
  handleAddProductToCart: (product: ProductToCartDto) => void;
  handleRemoveProductFromCart: (product: ProductToCartDto) => void;
  handleCartQtyIncrease: (product: ProductToCartDto) => void;
  handleCartQtyDecrease: (product: ProductToCartDto) => void;
  handleClearCart: () => void;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalValue, setCartTotalValue] = useState(0);
  const [cartProducts, setCartProducts] = useState<ProductToCartDto[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("CartItems");
    const cProducts: ProductToCartDto[] | null = JSON.parse(cartItems);
    const shopPaymentIntent: any = localStorage.getItem("paymentIntentId");
    const paymentIntent: string | null = JSON.parse(shopPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { quantity, total } = cartProducts.reduce(
          (acc, item) => {
            if (item.price) {
              acc.total += item.amount * item.price;
            }

            acc.quantity += item.amount;
            return acc;
          },
          {
            quantity: 0,
            total: 0,
          }
        );
        setCartTotalQuantity(quantity);
        setCartTotalValue(total);
      }
    };
    getTotals();
  }, [cartProducts]);

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

  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem("paymentIntentId", JSON.stringify(val));
  }, []);

  const value = {
    cartTotalQuantity,
    cartTotalValue,
    cartProducts,
    paymentIntent,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleSetPaymentIntent,
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
