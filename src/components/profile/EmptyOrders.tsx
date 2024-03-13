import { paths } from "@/paths";
import { Link } from "@nextui-org/react";
import React from "react";
import { MdArrowBack } from "react-icons/md";

interface EmptyProps {
  message: string;
}

function Empty({ message }: EmptyProps) {
  return (
    <div className="flex flex-col items-center py-16">
      <div>
        <p className="text-2xl">{message}</p>
      </div>
      <div>
        <Link
          href={paths.home()}
          className="text-content3 flex items-center gap-1 mt-2"
        >
          <MdArrowBack size={20} />
          <span>Começe a comprar</span>
        </Link>
      </div>
    </div>
  );
}

export default Empty;
