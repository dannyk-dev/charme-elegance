"use client";
import { useToast } from "@/app/(hooks)/useToast";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  title?: string;
  message?: string;
  isError?: boolean;
  isVisible?: boolean;
};

export const AddToCartNotification = ({
  title = "",
  message = "",
  isError = false,
  isVisible = true,
}: Props) => {
  const router = useRouter();

  const { ToastContainer } = useToast({
    title,
    description: message,
    actionLabel: isError ? undefined : "View Cart",
    onActionClick: () => {
      router.push("/bag");
    },
  });

  if (!isVisible) return null;
  return <ToastContainer />;
};

// export default AddToCartNotification;
