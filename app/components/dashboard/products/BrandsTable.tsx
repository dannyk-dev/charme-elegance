import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";
import { CreateBrand, DeleteBrandForm, EditBrand } from "./MutateBrandModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ActionsDropdown from "../../shared/ActionsDropdown";

async function getData() {
  const data = await prisma.brand.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  return data;
}

export default async function BrandsTable() {
  // noStore();
  const data = await getData();

  return (
    <>
      <Card className="mt-5">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-1.5 p-6">
            <CardTitle>Brands</CardTitle>
            <CardDescription>Manage your Brands catalog</CardDescription>
          </div>
          <div className="flex items-center justify-end ">
            {/* <EditBraind /> */}
            <CreateBrand />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Products Count</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      alt="Brand Logo"
                      src={item.logo}
                      height={64}
                      width={64}
                      className="rounded-md object-cover h-16 w-16"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  {/* <TableCell>{item.}</TableCell> */}
                  <TableCell>{item._count.products}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-end">
                    <ActionsDropdown
                      EditForm={<EditBrand data={item} />}
                      DeleteForm={<DeleteBrandForm data={item} />}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
