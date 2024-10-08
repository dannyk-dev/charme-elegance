import { ButtonProps } from "@/components/ui/button";
import React from "react";

export interface ModalProps {
  title: string;
  description?: string;
  triggerButtonText?: string;
  triggerButtonProps?: ButtonProps;
  customTrigger?: React.ReactNode;
  contentOnly?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  disableTrigger?: boolean;
}

export interface ModalContentProps {}
