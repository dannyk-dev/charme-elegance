import { delItem, delWishlistItem } from "@/app/actions";
import { CartItem } from "@/app/lib/interfaces";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { DeleteItem } from "../SubmitButtons";
import ProductQuantitySelection from "./ProductQuantitySelection";
import AddToWishList from "./addToWishList";

// type Props = {}
interface WishListItemProps {
  item: CartItem;
}

function WishListItem({ item }: WishListItemProps) {
  return (
    <div className="flex w-full gap-x-4 ">
      <div className="w-24 h-24 sm:w-24 sm:h-24 relative">
        <Image
          className="rounded-md object-cover"
          fill
          src={item.imageString}
          alt="Product image"
        />
      </div>
      {/* <div className=" flex justify-between w-full font-medium"> */}
      <div className="flex flex-col h-full w-full ">
        <div className="flex items-start gap-x-2 w-full flex-col">
          <div className="flex flex-col">
            {/* <p className="text-muted text-sm">{item.brand.name}</p> */}
            <Button
              asChild
              variant="link"
              size="sm"
              className="text-sm text-gray-500 p-0 text-left justify-start"
            >
              <Link
                href={`/products/${item.brand.name || ""}`}
                // className="text-sm text-gray-400"
              >
                {item.brand.name || ""}
              </Link>
            </Button>
            <Button
              asChild
              variant="link"
              size="sm"
              className="p-0 text-xl items-start"
            >
              <Link href={`/product/${item.id}`}>
                {item.name} - {item.size}
              </Link>
            </Button>
          </div>
          <div className="flex">
            <p>${item.price}</p>
          </div>
          {/* <ProductQuantitySelection item={item} /> */}
        </div>

        <div className="flex space-x-6 justify-end items-end">
          <form action={delWishlistItem} className="text-end">
            <input type="hidden" name="productId" value={item.id} />
            <DeleteItem iconOnly />
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default WishListItem;
