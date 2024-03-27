import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/nav/Header";
import Footer from "@/components/footer/Footer";
import Breadcrumb from "@/components/common/Breadcrumbs";
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "@/components/common/WhatsappButton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Pantanal Headshop, sua loja de tabacaria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="light">
      <body className={poppins.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#292524",
              color: "#f5f5f4",
            },
          }}
        />
        <WhatsAppButton />
      </body>
    </html>
  );
}
