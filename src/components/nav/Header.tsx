import React from "react";
import Contact from "./Contact";
import MainNav from "./MainNav";
import * as queries from "@/queries";

async function Header() {
  const categories = await queries.allCategories();
  return (
    <header>
      <Contact />
      <MainNav categories={categories} />
      <div></div>
    </header>
  );
}

export default Header;
