import { Link } from "@nextui-org/react";
import React from "react";
import Container from "../Container";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { paths } from "@/paths";

function Contact() {
  return (
    <div className="w-full bg-primary py-2 hidden lg:block">
      <Container>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2"
            >
              <FaPhoneAlt size={20} className="fill-secondary" />
              <p className="text-neutral-50 antialiased">{`(67) 9 9999-9999`}</p>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2"
            >
              <IoLogoWhatsapp size={20} className="fill-secondary" />
              <p className="text-neutral-50 antialiased">{`(67) 9 9999-9999`}</p>
            </Link>
          </div>
          <div className="flex flex-row gap-4 items-center justify-center py-2">
            <FiUser size={20} className="text-neutral-50" />
            <p className="text-neutral-50 antialiased uppercase font-bold">
              Bem vindo visitante,{" "}
              <Link
                href={paths.signUp()}
                className="text-neutral-50 antialiased border-b border-b-transparent hover:border-b-neutral-50"
              >
                cadastre-se
              </Link>{" "}
              ou{" "}
              <Link
                href={paths.signIn()}
                className="text-neutral-50 antialiased border-b border-b-transparent hover:border-b-neutral-50"
              >
                faça seu login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Contact;
