import Link from "next/link";
import FooterCard from "./FooterCard";
import { Button } from "@/components/ui/button";

const footerLinksColumns = [
  [
    // Get Help
    {
      id: "h1",
      text: "Get Help",
      heading: true,
    },
    {
      id: "01",
      href: "/contact",
      text: "Support",
    },
    {
      id: "02",
      href: "/user/orders",
      text: "Track an Order",
    },
    {
      id: "03",
      href: "/stores",
      text: "Find a store",
    },
    {
      id: "04",
      href: "/user/return-policy",
      text: "Cancel or Return",
    },
    {
      id: "05",
      href: "/contact",
      text: "Contact Us",
    },
    {
      id: "06",
      href: "/contact/feedback",
      text: "Feedback",
    },
  ],
  [
    // Our company
    {
      id: "h2",
      text: "Our Company",
      heading: true,
    },
    {
      id: "10",
      href: "/about-us",
      text: "About Us",
    },
    {
      id: "11",
      href: "/about-us/our-vision",
      text: "Mission & Vision",
    },
  ],
];

export function Footer() {
  return (
    <footer className="mt-16 mb-10 max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
      <FooterCard />
      <div className="border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 flex  justify-between">
        <div className=""></div>
        <div className="flex gap-x-24">
          {footerLinksColumns.map((linkCols, index) => (
            <div className="flex flex-col " key={index}>
              {linkCols.map((link) =>
                link?.heading ? (
                  <h1 key={link.id} className="font-bold text-xl mb-4">
                    {link.text}
                  </h1>
                ) : (
                  <Button
                    asChild
                    key={link.id}
                    variant="link"
                    className="text-left justify-start px-0"
                  >
                    <Link href={link?.href || "#"}>{link.text}</Link>
                  </Button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <p className="text-xs leading-5 text-gray-700">
          &copy; 2024 Charme&Elegance. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
