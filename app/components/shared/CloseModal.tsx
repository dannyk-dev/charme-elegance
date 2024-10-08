import { DialogClose } from "@/components/ui/dialog";
import { DrawerClose } from "@/components/ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";
import React, { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const CloseModal = ({
  children,
  defer = false,
}: PropsWithChildren & { defer?: boolean }) => {
  // const {  } = useFormStatus();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // if (defer) return children;

  if (isDesktop) {
    return <DialogClose asChild>{children}</DialogClose>;
  }

  return <DrawerClose asChild>{children}</DrawerClose>;
};

export default CloseModal;
