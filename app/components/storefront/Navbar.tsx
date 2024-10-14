import React from "react";
import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const wishlist: Cart | null = await redis.get(`wishlist-${user?.id}`);

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const wishlistTotal =
    wishlist?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Charme&Elegance
          </h1>
        </Link>
        <NavbarLinks />
      </div>

      <div className="flex items-center">
        {user ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href="/user/wishlist"
                    className="group p-2 flex items-center mr-2"
                  >
                    <Heart className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {wishlistTotal}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-lg">Wishlist</p>
                  <p className="text-sm">Save items to purchase later</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href="/bag"
                    className="group p-2 flex items-center mr-2"
                  >
                    <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {total}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-lg">Bag</p>
                  <p className="text-sm">Your items added for purchase.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <UserDropdown
              email={user.email as string}
              name={user.given_name as string}
              userImage={""}
            />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-end md:space-x-2">
            <Button variant="ghost" asChild size={"sm"}>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant="ghost" asChild size="sm">
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
