import { type ReactNode } from "react";
import { Navbar } from "../components/storefront/Navbar";
import { Footer } from "../components/storefront/Footer";
import React from "react";
import TopNavbar from "../components/storefront/TopNavbar";

export default function StoreFrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <TopNavbar />
      <Navbar />
      <main className="max-w-[88rem] mx-auto px-2 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
