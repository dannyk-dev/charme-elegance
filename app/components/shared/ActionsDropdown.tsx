"use client";

import { useMediaQuery } from "@uidotdev/usehooks";
import React from "react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditBrand } from "../dashboard/products/MutateBrandModal";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface ActionDropdownProps {
  EditForm?: React.ReactNode;
  DeleteForm?: React.ReactNode;
}

function ActionsDropdown({ EditForm, DeleteForm }: ActionDropdownProps) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [closeMenu, setCloseMenu] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleEdit = () => {
    setOpenEdit((prev) => !prev);
    setCloseMenu(false);
  };

  const handleDelete = () => {
    setOpenDelete((prev) => !prev);
    setCloseMenu(false);
  };

  if (isDesktop) {
    return (
      <>
        <DropdownMenu open={closeMenu} onOpenChange={setCloseMenu}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {EditForm && (
              <DropdownMenuItem onSelect={handleEdit}>Edit</DropdownMenuItem>
            )}

            {DeleteForm && (
              <DropdownMenuItem onSelect={handleDelete}>
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {EditForm && (
          <Modal
            title="Edit Brand"
            description="Brand details"
            disableTrigger
            open={openEdit}
            setOpen={setOpenEdit}
          >
            {EditForm}
          </Modal>
        )}
        {DeleteForm && (
          <Modal
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete this
            product and remove all data from our servers."
            disableTrigger
            open={openDelete}
            setOpen={setOpenDelete}
          >
            {DeleteForm}
          </Modal>
        )}
      </>
    );
  }
}

export default ActionsDropdown;
