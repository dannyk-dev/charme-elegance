"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const topBarLinks = [
  {
    id: 0,
    name: "Find a store",
    href: "/stores",
  },
  {
    id: 1,
    name: "Track an order",
    href: "/account/orders",
  },
  {
    id: 2,
    name: "About Us",
    href: "/about-us",
  },
  {
    id: 3,
    name: "Contact Us",
    href: "/contact",
  },
];

function TopNavbarLinks() {
  const location = usePathname();

  return (
    <>
      {topBarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group p-2 font-medium rounded-md text-xs sm:text-sm"
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}

export default TopNavbarLinks;
