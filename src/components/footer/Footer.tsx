import React from "react";
import Container from "../common/Container";
import FooterList from "./FooterList";
import * as queries from "@/queries";
import { Link } from "@nextui-org/react";
import { paths } from "@/paths";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

async function Footer() {
  const categories = await queries.allCategories();

  const links = [
    { name: "Sobre nós", path: paths.about() },
    { name: "Contato", path: paths.contact() },
    { name: "Politica de entrega", path: paths.polices() },
    { name: "FAQs", path: paths.faq() },
  ];

  return (
    <footer className="bg-primary text-sm">
      <Container>
        <div className="flex flex-col md:flex-row justify-between py-8">
          <FooterList>
            <h3 className="text-base font-bold antialiased text-content2 pb-2">
              Categorias
            </h3>
            {categories &&
              categories.map((category) => {
                return (
                  <Link
                    key={category.id}
                    href={paths.search(category.id)}
                    className="text-content2 antialiased"
                  >
                    {category.name}
                  </Link>
                );
              })}
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold antialiased text-content2 pb-2">
              Serviços ao consumidor
            </h3>
            {links.map((link, index) => {
              return (
                <Link
                  key={index}
                  href={link.path}
                  className="text-content2 antialiased"
                >
                  {link.name}
                </Link>
              );
            })}
          </FooterList>
          <div className="w-full md:w-1/3">
            <h3 className="text-base font-bold antialiased text-content2 pb-2">
              Sobre nós
            </h3>
            <p className="text-content2 antialiased text-base text-justify pb-2">
              Na {"Headshop Pantanal"}, nossa paixão é proporcionar uma
              experiência excepcional aos apreciadores de tabaco em todo o
              mundo. Desde o nosso início, nos dedicamos a oferecer uma seleção
              cuidadosamente curada de produtos premium, combinando tradição e
              inovação para satisfazer os gostos mais exigentes.
            </p>
            <p className="text-content2 antialiased text-base text-justify">
              &copy; {new Date().getFullYear()} {"Headshop Pantanal"}. Todos os
              direitos reservados.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold antialiased text-content2 pb-2">
              Siga-nos
            </h3>
            <div className="flex gap-2">
              <Link href="#" className="text-content2">
                <MdFacebook size={24} />
              </Link>
              <Link href="#" className="text-content2">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#" className="text-content2">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#" className="text-content2">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
