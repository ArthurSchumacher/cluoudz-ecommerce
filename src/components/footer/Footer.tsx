import React from "react";
import Container from "../common/Container";
import FooterList from "./FooterList";
import * as queries from "@/queries";
import { Link, Image } from "@nextui-org/react";
import { paths } from "@/paths";
import { AiFillInstagram } from "react-icons/ai";

async function Footer() {
  const categories = await queries.allCategories();

  const links = [
    { name: "Sobre nós", path: paths.about() },
    { name: "Contato", path: paths.contact() },
    { name: "FAQs", path: paths.faq() },
  ];

  return (
    <footer className="bg-primary text-sm">
      <Container>
        <div className="flex flex-col md:flex-row justify-between py-8">
          <div className="w-full md:w-1/3 flex flex-col justify-evenly sm:order-first order-last">
            <div className="flex items-center justify-center">
              <Image
                src={"/logo-footer.png"}
                alt={"Pantanal headshop logo"}
                className="aspect-square sm:h-64 h-56"
              />
            </div>
            <p className="text-content2 antialiased text-base text-justify py-2">
              Desenvolvido por Arthur Schumacher
              <br /> &copy; {new Date().getFullYear()} {"Headshop Pantanal"}.
              Todos os direitos reservados.
            </p>
          </div>
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
          <FooterList>
            <h3 className="text-base font-bold antialiased text-content2 pb-2">
              Siga-nos
            </h3>
            <div className="flex gap-2">
              {/* <Link href="#" className="text-content2">
                <MdFacebook size={24} />
              </Link> */}
              {/* <Link href="#" className="text-content2">
                <AiFillTwitterCircle size={24} />
              </Link> */}
              <Link href={paths.instagram()} className="text-content2">
                <AiFillInstagram size={24} />
              </Link>
              {/* <Link href="#" className="text-content2">
                <AiFillYoutube size={24} />
              </Link> */}
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
