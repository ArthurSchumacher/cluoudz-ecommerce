"use client";

import { Favorite } from "@/types/favorite";
import React, { SyntheticEvent } from "react";
import Title from "../Title";
import { SingleProduct } from "@/types/product";
import FavoriteItemContent from "./FavoriteItemContent";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import * as actions from "@/actions";
import { useRouter } from "next/navigation";

interface ClientFavoritesProps {
  favorite: Favorite;
  products: SingleProduct[];
}

function ClientFavorites({ favorite, products }: ClientFavoritesProps) {
  const router = useRouter();
  const handleClear = async (e: SyntheticEvent) => {
    try {
      await actions.clearFavorites();
      toast.success("Sucesso ao limpar favoritos.");
      router.refresh();
    } catch (error) {
      toast.error("Falha ao limpar favoritos.");
    }
  };

  return (
    <section className="pb-16">
      <Title label="Itens favoritos" isUpperCase={false} />
      <div className="grid grid-cols-4 text-xs gap-4 pb-2 items-center">
        <p className="col-span-3 justify-self-start">Produtos</p>
        <p className="col-span-1 justify-self-center">Ações</p>
      </div>
      <div>
        {products.map((product) => {
          return <FavoriteItemContent key={product.id} product={product} />;
        })}
      </div>
      <div className="border-t-[1.5px] border-content2 py-4 flex justify-between gap-8">
        <form onSubmit={handleClear}>
          <Button
            type="submit"
            size="sm"
            radius="sm"
            color="secondary"
            variant="ghost"
            className="w-full"
          >
            Limpar favoritos
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ClientFavorites;
