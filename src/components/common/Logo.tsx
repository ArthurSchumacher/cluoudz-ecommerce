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
        src="/logo-header.png"
        alt={"Logo pantanal headshop"}
        className="sm:h-32 h-24"
      />
    </Link>
  );
}

export default Logo;
