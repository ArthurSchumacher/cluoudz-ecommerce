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
    <footer className="bg-secondary text-sm">
      <Container>
        <div className="flex flex-col md:flex-row justify-between py-8">
          <FooterList>
            <h3 className="text-base font-bold antialiased text-neutral-50 pb-2">
              Categorias
            </h3>
            {categories &&
              categories.map((category) => {
                return (
                  <Link
                    key={category.id}
                    className="text-neutral-50 antialiased"
                  >
                    {category.name}
                  </Link>
                );
              })}
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold antialiased text-neutral-50 pb-2">
              Serviços ao consumidor
            </h3>
            {links.map((link, index) => {
              return (
                <Link
                  key={index}
                  href={link.path}
                  className="text-neutral-50 antialiased"
                >
                  {link.name}
                </Link>
              );
            })}
          </FooterList>
          <div className="w-full md:w-1/3">
            <h3 className="text-base font-bold antialiased text-neutral-50 pb-2">
              Sobre nós
            </h3>
            <p className="text-neutral-50 antialiased text-base text-justify pb-2">
              Somos uma loja de sexshop dedicada a oferecer uma experiência
              única e inclusiva para todos os nossos clientes. Nossa missão é
              proporcionar um ambiente acolhedor e discreto, onde as pessoas
              possam explorar sua sexualidade com confiança e sem julgamentos.
              Com uma ampla seleção de produtos cuidadosamente selecionados,
              estamos comprometidos em atender às diversas necessidades e
              desejos de nossos clientes.
            </p>
            <p className="text-neutral-50 antialiased text-base text-justify">
              &copy; {new Date().getFullYear()} Sexs. Todos os direitos
              reservados.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold antialiased text-neutral-50 pb-2">
              Siga-nos
            </h3>
            <div className="flex gap-2">
              <Link href="#" className="text-neutral-50">
                <MdFacebook size={24} />
              </Link>
              <Link href="#" className="text-neutral-50">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#" className="text-neutral-50">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#" className="text-neutral-50">
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
