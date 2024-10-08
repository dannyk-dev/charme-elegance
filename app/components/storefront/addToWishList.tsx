"use client";

import { addToWishlist } from "@/app/actions";
import { CartItem } from "@/app/lib/interfaces";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SaveToWishListButton } from "../SubmitButtons";

type Props = {
  // item: CartItem;
  productId: string;
  quantity: number;
  isSaved: boolean;
};

function AddToWishList({ productId, quantity, isSaved }: Props) {
  return (
    <form
      action={async (formData) => {
        // "use server";
        const productId = formData.get("productId") as string;
        const quantity = parseInt(formData.get("quantity") as string, 10);

        try {
          await addToWishlist(productId, quantity);
          toast({
            title: "Added to WishList successfully",
            description: "Item added successfully",
            action: <Link href="/user/wishlist">View Wishlist</Link>,
          });
        } catch (error) {
          toast({
            title: "An Error occurred",
            variant: "destructive",
            description: "Failed to add item to wishlist",
          });
        }
      }}
      className="text-end"
    >
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={quantity} />
      {isSaved ? (
        <Button
          disabled
          size="sm"
          variant="outline"
          className=" mt-0 border-red-500 text-white bg-red-500"
        >
          {/* <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait */}
          <Heart className="mr-4 h-5 w-5 text-white fill-white" />
          Saved
        </Button>
      ) : (
        <SaveToWishListButton />
      )}
    </form>
  );
}

export default AddToWishList;
