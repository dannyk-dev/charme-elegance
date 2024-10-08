"use client";

import { addItem } from "@/app/actions";
import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { CartItem } from "@/app/lib/interfaces";

type Props = {
  productId: string;
  cartItem: CartItem | null;
  noUser?: boolean;
  isSingleItem?: boolean;
  formClasses?: string;
  noUserDisable?: boolean;
};

const AddToCart = ({
  productId,
  cartItem,
  noUser = false,
  isSingleItem = true,
  formClasses,
  noUserDisable = true,
}: Props) => {
  const { toast } = useToast();
  return (
    <form
      action={async (formData) => {
        if (noUser) {
          toast({
            title: "Sign-in to start purchasing",
            description:
              "This is necessary for you to track your orders and save to your bag",
            action: (
              <Button asChild variant="link" size="sm" className="text-sm">
                <Link href="/">Sign-in</Link>
              </Button>
            ),
          });

          return;
        }

        const quantity = isSingleItem
          ? 1
          : parseInt(formData.get("quantity") as string, 10);

        try {
          await addItem(productId, quantity);
          toast({
            title: "Added to Cart successfully",
            description: "Item added successfully",
            action: <Link href="/bag">View product</Link>,
          });
        } catch (error) {
          toast({
            title: "An Error occurred",
            variant: "destructive",
            description: "Failed to add item to cart",
          });
        }
      }}
      className={formClasses || ""}
    >
      {!Boolean(cartItem) && !isSingleItem && (
        // <div className="flex gap-3 mb-4">
        <div className="flex flex-col gap-1 mb-4 w-1/3">
          <Label htmlFor="quantity" className="pt-4 pb-0 block">
            Quantity
          </Label>
          <Select
            key={"quantity"}
            name={"quantity"}
            // disabled={!Boolean(cartItem)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Quantity" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
                <SelectItem
                  key={quantity}
                  value={quantity.toString()}
                  // defaultValue={quantity === 2}
                >
                  {quantity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        // </div>
      )}

      {/* <div className="flex gap-x-4 items-center mt-5"> */}
      <ShoppingBagButton
        buttonProps={{
          disabled: Boolean(cartItem) || (noUserDisable && noUser),
          size: isSingleItem ? "default" : "lg",
        }}
        text={
          noUser
            ? "Login to save to bag"
            : Boolean(cartItem)
            ? `${cartItem?.quantity} in Bag`
            : undefined
        }
      />

      {/* </div> */}
    </form>
  );
};

export default AddToCart;
