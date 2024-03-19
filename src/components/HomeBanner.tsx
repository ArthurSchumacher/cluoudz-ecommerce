import React from "react";
import { Image } from "@nextui-org/react";

function HomeBanner() {
  return (
    <div className="relative bg-gradient-to-r from-secondary-700 to-secondary-900">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold antialiased text-white mb-4">
            Promoção de abertura!
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Aproveite o desconto em itens selecionados.
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 font-bold antialiased">
            Até 50% OFF
          </p>
        </div>
        {/* <div className="w-1/3">
          <Image src={"/sexshop-banner.png"} alt={"Banner"} />
        </div> */}
      </div>
    </div>
  );
}

export default HomeBanner;
