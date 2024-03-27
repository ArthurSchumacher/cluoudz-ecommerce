import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import Container from "../common/Container";
import NavbarMenuModal from "./NavbarMenuModal";
import { Category } from "@/types/category";
import { paths } from "@/paths";
import ShoppingBag from "./ShoppingBag";
import { Suspense } from "react";
import Logo from "../common/Logo";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth";
import SearchInput from "./SearchInput";
import { useSearchParams } from "next/navigation";

interface MainNavProps {
  categories: Category[];
  category?: string;
}

async function MainNav({ categories, category }: MainNavProps) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <nav className="w-full sm:py-7 py-2 bg-background text-content1">
      <Container>
        <div className="flex flex-row items-center justify-evenly gap-x-8">
          <div className="flex-shrink flex flex-row items-center justify-center gap-x-2">
            <NavbarMenuModal categories={categories} />
            <Logo />
          </div>
          <div className="flex-grow sm:block hidden max-w-screen-md">
            <Suspense>
              <SearchInput />
            </Suspense>
          </div>
          <div className="flex-shrink flex items-center justify-center sm:gap-x-10 gap-x-1">
            <Button
              size="lg"
              as={Link}
              href={!session ? paths.signIn() : paths.profile()}
              isIconOnly
              variant="flat"
              className="bg-transparent text-content1 flex lg:hidden"
            >
              <FiUser size={30} className="text-content1" />
            </Button>
            <Button
              size="lg"
              isIconOnly
              as={Link}
              href={paths.favorites()}
              variant="flat"
              className="bg-transparent text-content1"
            >
              <FaRegHeart size={40} className="sm:block hidden" />
              <FaRegHeart size={30} className="sm:hidden block" />
            </Button>
            <ShoppingBag />
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default MainNav;
