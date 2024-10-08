import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React from "react";
import WishListItem from "./WishListItem";
import { Badge } from "@/components/ui/badge";
import CollapseContent from "../shared/CollapseContent";

type Props = {};

async function WishList({}: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const wishlist: Cart | null = await redis.get(`wishlist-${user.id}`);
  const wishlistCount =
    wishlist && wishlist.items.length ? wishlist.items.length : 0;

  return (
    <div className="w-full mt-4">
      {/* <Separator /> */}

      <CollapseContent
        triggerText=""
        contentHeader={
          <Button asChild variant="link" className="p-0 text-2xl">
            <Link href="/user/wishlist">
              Wishlist
              <Badge variant="outline" className="ml-2">
                {wishlistCount}
              </Badge>
            </Link>
          </Button>
          // <h1 className="text-2xl  flex items-center">
          //   Wishlist
          //   <Badge variant="outline" className="ml-2">
          //     {wishlistCount}
          //   </Badge>
          // </h1>
        }
      >
        {!wishlist || !wishlist?.items || wishlist.items.length < 1 ? (
          <div className="flex flex-col w-full  mt-4">
            <h1 className="text-lg text-gray-500">No Items in Wishlist</h1>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 mt-8 gap-8">
              {wishlist.items.map((item) => (
                <WishListItem item={item} key={item.id} />
              ))}

              {/* <div className="col-end-3"> */}
            </div>
            {/* <div className="w-full flex justify-end mt-8">
              <Button asChild variant="outline" size="sm">
                <Link href="/user/wishlist">See All</Link>
              </Button>
            </div> */}
          </>
        )}
      </CollapseContent>
    </div>
  );
}

export default WishList;
