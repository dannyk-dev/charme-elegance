import { delItem } from "@/app/actions";
import { CartItem } from "@/app/lib/interfaces";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { DeleteItem } from "../SubmitButtons";
import ProductQuantitySelection from "./ProductQuantitySelection";
import AddToWishList from "./addToWishList";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  return (
    <div key={item.id} className="flex w-full">
      <div className="w-24 h-24 sm:w-24 sm:h-24 relative">
        <Image
          className="rounded-md object-cover"
          fill
          src={item.imageString}
          alt="Product image"
        />
      </div>
      <div className="ml-5 flex justify-between w-full font-medium">
        <div className="flex flex-col h-full space-y-6 w-full justify-between">
          <div className="flex items-center gap-x-2 w-full">
            <div className="flex flex-col">
              <Button
                asChild
                variant="link"
                size="sm"
                className="text-sm text-gray-500 p-0 text-left justify-start"
              >
                <Link href={`/products/${item?.brand?.name || ""}`}>
                  {item?.brand?.name || ""}
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
            <ProductQuantitySelection item={item} />
          </div>

          <div className="flex space-x-6 justify-end items-end">
            <form action={delItem} className="text-end">
              <input type="hidden" name="productId" value={item.id} />
              <DeleteItem iconOnly />
            </form>
            <AddToWishList
              productId={item.id}
              quantity={item.quantity}
              isSaved={item.hasWishlist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
