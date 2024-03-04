import { Link } from "@nextui-org/react";
import React, { Suspense } from "react";
import Container from "../common/Container";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import AuthHeader from "./AuthHeader";

function Contact() {
  return (
    <div className="w-full bg-primary py-2 hidden lg:block">
      <Container>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 py-4"
            >
              <FaPhoneAlt size={20} className="fill-secondary" />
              <p className="text-neutral-50 antialiased">{`(67) 9 9999-9999`}</p>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 py-4"
            >
              <IoLogoWhatsapp size={20} className="fill-secondary" />
              <p className="text-neutral-50 antialiased">{`(67) 9 9999-9999`}</p>
            </Link>
          </div>
          <div className="flex flex-row gap-4 items-center justify-center py-2">
            <Suspense>
              <AuthHeader />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Contact;
