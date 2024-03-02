import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { FaBars, FaRegHeart, FaSearch, FaShoppingBag } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import Container from "../Container";
import NavbarMenuModal from "./NavbarMenuModal";

function MainNav() {
  return (
    <nav className="w-full sm:py-10 py-2 bg-fuchsia-950 text-neutral-50">
      <Container>
        <div className="flex flex-row items-center justify-between gap-x-8">
          <div className="flex-shrink flex flex-row items-center justify-center gap-x-2">
            <NavbarMenuModal />
            <p className="sm:text-5xl text-2xl font-bold text-neutral-50 antialiased">
              SEXS
            </p>
          </div>
          <div className="flex-grow sm:block hidden max-w-screen-md">
            <Input
              startContent={<FaSearch className="text-fuchsia-950" />}
              placeholder="Hoje você precisa de um(a)..."
              className="w-full"
              size="sm"
              radius="sm"
            />
          </div>
          <div className="flex-shrink flex items-center justify-center sm:gap-x-10 gap-x-1">
            <Button
              size="lg"
              as={Link}
              href="#"
              isIconOnly
              variant="flat"
              className="bg-transparent text-neutral-50 flex lg:hidden"
            >
              <FiUser size={20} className="text-neutral-50" />
            </Button>
            <Button
              size="lg"
              isIconOnly
              as={Link}
              href="#"
              variant="flat"
              className="bg-transparent text-neutral-50"
            >
              <FaRegHeart size={40} className="sm:block hidden" />
              <FaRegHeart size={20} className="sm:hidden block" />
            </Button>
            <Button
              size="lg"
              isIconOnly
              as={Link}
              href="#"
              variant="flat"
              className="bg-transparent text-neutral-50"
            >
              <FaShoppingBag size={40} className="sm:block hidden" />
              <FaShoppingBag size={20} className="sm:hidden block" />
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default MainNav;
