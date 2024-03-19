import { paths } from "@/paths";
import { Link } from "@nextui-org/react";
import React from "react";

function Logo() {
  return (
    <Link
      href={paths.home()}
      className="sm:text-5xl text-2xl font-bold text-content1 antialiased"
    >
      {`CLOUD'S`}
    </Link>
  );
}

export default Logo;
