import { paths } from "@/paths";
import { Link, Image } from "@nextui-org/react";
import React from "react";

function Logo() {
  return (
    <Link
      href={paths.home()}
      className="sm:text-5xl text-2xl font-bold text-content1 antialiased"
    >
      <Image
        src="/image.png"
        alt={"Logo pantanal headshop"}
        className="sm:h-36 h-28"
      />
    </Link>
  );
}

export default Logo;
