"use client";

import { SingleProduct } from "@/types/product";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Link } from "@nextui-org/react";
import ProductImage from "./ProductImage";
import * as actions from "@/actions";
import { ProductToCartDto } from "@/types/cart";
import SetQuantity from "./SetQuantity";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { paths } from "@/paths";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import { revalidateTag } from "next/cache";
import { FaRegHeart } from "react-icons/fa";
import { ProductToFavoriteDto } from "@/types/favorite";

interface ProductDetailsProps {
  product: SingleProduct;
}

const Horizontal = () => {
  return <span className="w-[30%] h-[1.5px] bg-content2 my-2" />;
};

function ProductDetails({ product }: ProductDetailsProps) {
  const session = useSession();
  const router = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [cartProduct, setCartProduct] = useState<ProductToCartDto>({
    productId: +product.id,
    amount: quantity,
  });
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.productId === cartProduct.productId
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, cartProduct]);

  const handleQtyIncrease = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const handleQtyDecrease = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handleAddToFavorites = async (e: SyntheticEvent) => {
    e.preventDefault();
    const addItemToFavorites: ProductToFavoriteDto = {
      productId: +product.id,
    };

    if (session.status === "unauthenticated") {
      return router.push(paths.signIn());
    }

    await actions.addToFavorite(addItemToFavorites);
    toast.success("Item adicionado aos favoritos com sucesso.");
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const addItemToCartDto: ProductToCartDto = {
      productId: +product.id,
      amount: quantity,
      price: product.price,
    };

    if (session.status === "unauthenticated") {
      return router.push(paths.signIn());
    }

    // setCartProduct(addItemToCartDto);
    // handleAddProductToCart(addItemToCartDto);
    await actions
      .addToCart({ productId: +product.id, amount: quantity })
      .catch((error) => {
        return toast.error("Falha ao adicionar item ao carrinho.");
      });
    await actions.revalidateCart();
    toast.success("Item adicionado ao carrinho com sucesso.");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
      <ProductImage product={product} sale={product.sale} />
      <div className="flex flex-col gap-1 text-content3 text-sm">
        <h2 className="text-3xl font-medium text-content3">{product.name}</h2>
        <Horizontal />
        <p className="text-secondary antialiased text-4xl font-bold">
          {product.sale
            ? formatPrice(
                product.price - (product.price * product.discount) / 100
              )
            : formatPrice(product.price)}{" "}
          <span className="text-content3 antialiased text-base font-normal">
            no pix.
          </span>
        </p>
        <p className="text-content3 antialiased text-base">
          ou <strong>R$ {Number(product.price).toFixed(2)}</strong> no cartão de
          crédito.
        </p>
        <Horizontal />
        <p className="text-justify">{product.description}</p>
        <Horizontal />
        <div className="text-base">
          <span className="font-bold">Categoria: </span>
          {product.category.name}
        </div>
        <div
          className={`${
            product.stock > 0 ? "text-green-400" : "text-red-400"
          } text-base`}
        >
          {product.stock > 0 ? "Em estoque." : "Sem estoque."}
        </div>
        <Horizontal />
        <SetQuantity
          cartCounter
          quantity={quantity}
          handleQuantityDecrease={handleQtyDecrease}
          handleQuantityIncrease={handleQtyIncrease}
        />
        <Horizontal />
        <div className="flex gap-x-4">
          <div className="max-w-[30%]">
            <Button
              onClick={handleSubmit}
              size="lg"
              radius="sm"
              color="secondary"
              variant="solid"
            >
              Adicionar ao carrinho
            </Button>
          </div>
          <form onSubmit={handleAddToFavorites}>
            <Button
              type="submit"
              size="lg"
              radius="sm"
              color="danger"
              variant="solid"
              isIconOnly
            >
              <FaRegHeart size={20} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
