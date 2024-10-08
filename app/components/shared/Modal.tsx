"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ModalProps } from "./types";

export default function Modal({
  title,
  description,
  triggerButtonText,
  children,
  triggerButtonProps = {},
  customTrigger,
  open,
  setOpen,
  disableTrigger = false,
}: ModalProps & PropsWithChildren) {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog
        open={open || isModalOpen}
        onOpenChange={setOpen || setIsModalOpen}
        modal
      >
        {!disableTrigger && (
          <DialogTrigger asChild>
            {customTrigger ? (
              customTrigger
            ) : (
              <Button {...triggerButtonProps}>{triggerButtonText}</Button>
            )}
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open || isModalOpen} onOpenChange={setOpen || setIsModalOpen}>
      {!disableTrigger && (
        <DrawerTrigger asChild>
          {customTrigger ? (
            customTrigger
          ) : (
            <Button {...triggerButtonProps}>Edit Brand</Button>
          )}
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
