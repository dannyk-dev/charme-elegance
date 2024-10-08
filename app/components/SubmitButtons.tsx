"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Heart, Loader2, ShoppingBag, Trash2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface buttonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({ text, variant }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={variant}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={variant} type="submit">
          {text}
        </Button>
      )}
    </>
  );
}

export function ShoppingBagButton({
  buttonProps,
  text,
  iconOnly = false,
}: {
  buttonProps?: ButtonProps;
  text?: string;
  iconOnly?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-0 ">
          {!iconOnly ? (
            <>
              <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
            </>
          ) : (
            <Loader2 className="mr-4 h-5 w-5 animate-spin" />
          )}
        </Button>
      ) : (
        <Button
          size="lg"
          className="w-full mt-0 "
          type="submit"
          {...buttonProps}
        >
          {text}
          {!text && (
            <>
              {!iconOnly ? (
                <>
                  <ShoppingBag className="mr-4 h-5 w-5" /> Add to Cart
                </>
              ) : (
                <ShoppingBag className="mr-4 h-5 w-5" />
              )}
            </>
          )}
        </Button>
      )}
    </>
  );
}

export function SaveToWishListButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          size="sm"
          variant="outline"
          className=" mt-0 border-red-500 text-red-500"
        >
          <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="border-red-500 text-red-500 hover:text-red-500 hover:bg-red-50"
          type="submit"
        >
          <Heart className="mr-4 h-5 w-5" /> Save
        </Button>
      )}
    </>
  );
}

export function DeleteItem({ iconOnly = false }: { iconOnly?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant="destructive" disabled size={iconOnly ? "icon" : "sm"}>
          {iconOnly ? (
            <Loader2 className=" h-5 w-5 animate-spin" />
          ) : (
            <>
              <Loader2 className="mr-4 h-5 w-5 animate-spin" />
              Removing...
            </>
          )}
        </Button>
      ) : (
        <Button
          variant="outline"
          size={iconOnly ? "icon" : "sm"}
          type="submit"
          className="text-sm"
        >
          {iconOnly ? (
            <Trash2 />
          ) : (
            <>
              <Trash2 className="mr-2" /> Remove
            </>
          )}
        </Button>
        // </button>
      )}
    </>
  );
}

export function ChceckoutButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-5">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          type="submit"
          size="lg"
          className="w-full mt-5 bg-amber-400 text-gray-900 font-medium"
        >
          Checkout
        </Button>
      )}
    </>
  );
}
