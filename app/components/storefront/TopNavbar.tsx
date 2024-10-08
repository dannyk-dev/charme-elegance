import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import TopNavbarLinks from "./TopNavbarLinks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

async function TopNavbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <nav className="w-full max-w-[88rem] mx-auto px-4 sm:px-6 md:px-8 py-2 flex items-center justify-between ">
        <div className="flex w-full justify-center md:justify-between items-center">
          <div className="hidden md:flex items-center">
            <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-200 border-amber-100">
              Free Delivery above a 5000mt purchase
            </Badge>
          </div>

          <div className="flex items-center  md:gap-x-4">
            <TopNavbarLinks />

            {user && user.email === "kruger.dkk@gmail.com" ? (
              <Button
                asChild
                className="justify-end ml-auto hidden lg:flex "
                variant="outline"
                size="sm"
              >
                <Link href="/dashboard" target="_blank">
                  Dashboard
                  <ArrowUpRightFromSquareIcon
                    height={16}
                    width={16}
                    className="ml-2"
                  />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </nav>
      <Separator />
    </>
  );
}
export default TopNavbar;
