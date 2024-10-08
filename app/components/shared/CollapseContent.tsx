"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ChevronsUpDown } from "lucide-react";
import React, { PropsWithChildren, useState } from "react";

// type Props = {};
interface CollapseContentProps {
  // title?: string;
  contentHeader?: React.ReactNode;
  contentHeaderActions?: React.ReactNode;
  triggerText?: string;
}

function CollapseContent({
  children,
  triggerText,
  contentHeader,
  contentHeaderActions,
}: CollapseContentProps & PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between ">
        <div className="flex w-full justify-between mt-10">
          {contentHeader}
          {/* <h1 className="text-2xl  flex items-center">
            Wishlist
            <Badge variant="outline" className="ml-2">
              {wishlistCount}
            </Badge>
          </h1> */}

          <div className="flex">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-6 w-6" />
                <span className="sr-only">{triggerText || "Toggle"}</span>
              </Button>
            </CollapsibleTrigger>
            {contentHeaderActions}
          </div>
        </div>
      </div>
      <Separator />
      <CollapsibleContent className="space-y-2 w-full ">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default CollapseContent;
