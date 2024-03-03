import React from "react";
import Contact from "./Contact";
import MainNav from "./MainNav";
import * as queries from "@/queries";
import CategoriesNav from "./CategoriesNav";

async function Header() {
  const categories = await queries.allCategories();
  return (
    <header>
      <Contact />
      <MainNav categories={categories} />
      <CategoriesNav categories={categories} />
    </header>
  );
}

export default Header;
