"use client";

import { addItem, editItemQuantity } from "@/app/actions";
import { CartItem } from "@/app/lib/interfaces";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@prisma/client";
import React, { useCallback, useMemo, useState } from "react";

type Props = {
  item: CartItem;
};

function ProductQuantitySelection({ item }: Props) {
  const [quantity, setQuantity] = useState<string>(item.quantity.toString());

  const currentPrice = useMemo(() => {
    return parseInt(quantity) * item.price;
  }, [quantity, item]);

  const handleQuantityChange = useCallback(
    async (e: string) => {
      setQuantity(e);
      await editItemQuantity(item.id, parseInt(e, 10));
    },
    [item]
  );

  return (
    <>
      <div className="ml-auto mr-1 w-20 ">
        <Select
          key={"quantity"}
          name={"quantity"}
          value={quantity}
          onValueChange={handleQuantityChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Quantity" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
              <SelectItem key={quantity} value={quantity.toString()}>
                {quantity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="ml-16">${currentPrice}</p>
    </>
  );
}

export default ProductQuantitySelection;
