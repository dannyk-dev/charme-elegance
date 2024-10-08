"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "../../shared/Modal";
import { createBrand, deleteBrand, editBrand } from "@/app/actions";
import { brandSchema, productSchema } from "@/app/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
// import { UploadDropzone } from "@uploadthing/react";
import { XIcon } from "lucide-react";
// import image from "next/image";
import Image from "next/image";
// import { UploadDropzone } from "@uploadthing/react";
import { UploadButton, UploadDropzone } from "@/app/lib/uplaodthing";
import { UploadThingError } from "uploadthing/server";
import { useState } from "react";
import CloseModal from "../../shared/CloseModal";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Brand } from "@prisma/client";
import { SubmitButton } from "../../SubmitButtons";

interface BrandEditData {
  data: Brand;
}

export function CreateBrand() {
  const [images, setImages] = useState<string[]>([]);
  const [lastResult, action] = useFormState(createBrand, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: brandSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = () => {
    // setLogoImage('')
    setImages([]);
  };

  return (
    <Modal title="Create Brand" triggerButtonText="Create Brand">
      <form
        className={"grid items-start gap-4"}
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
      >
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input
            type="text"
            key={fields.name.key}
            name={fields.name.name}
            defaultValue={fields.name.initialValue}
            className="w-full"
            placeholder="Product Name"
          />

          <p className="text-red-500">{fields.name.errors}</p>
        </div>
        <div className="grid gap-2">
          <Label>Images</Label>
          <input
            type="hidden"
            value={images}
            key={fields.logo.key}
            name={fields.logo.name}
            defaultValue={fields.logo.initialValue as any}
          />
          {images.length > 0 ? (
            <div className="flex gap-5">
              {images.map((image, index) => (
                <div key={index} className="relative w-[100px] h-[100px]">
                  <Image
                    height={100}
                    width={100}
                    src={image}
                    alt="Product Image"
                    className="w-full h-full object-cover rounded-lg border"
                  />

                  <button
                    onClick={() => handleDelete()}
                    type="button"
                    className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImages(res.map((r) => r.url));
              }}
              onUploadError={(e) => {
                alert("Something went wrong");
                console.log(e);
              }}
            />
          )}

          <p className="text-red-500">{fields.logo.errors}</p>
        </div>
        {/* <CloseModal defer={!form.dirty || form.status === "success"}> */}
        {/* <Button type="submit">Finish</Button> */}
        <SubmitButton variant="default" text="Finish" />
        {/* </CloseModal> */}
      </form>
    </Modal>
  );
}

export function EditBrand({ data }: BrandEditData) {
  const [images, setImages] = useState<string[]>([data.logo]);
  const [lastResult, action] = useFormState(editBrand, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: brandSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = () => {
    setImages([]);
  };

  return (
    <form
      className={"grid items-start gap-4"}
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
    >
      <input type="hidden" name="brandId" value={data.id} />
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input
          type="text"
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={data?.name || ""}
          className="w-full"
          placeholder="Brand Name"
        />

        <p className="text-red-500">{fields.name.errors}</p>
      </div>
      <div className="grid gap-2">
        <Label>Images</Label>
        <input
          type="hidden"
          value={images}
          key={fields.logo.key}
          name={fields.logo.name}
          defaultValue={fields.logo.initialValue as any}
        />
        {images.length > 0 ? (
          <div className="flex gap-5">
            {images.map((image, index) => (
              <div key={index} className="relative w-[100px] h-[100px]">
                <Image
                  height={100}
                  width={100}
                  src={image}
                  alt="Product Image"
                  className="w-full h-full object-cover rounded-lg border"
                />

                <button
                  onClick={() => handleDelete()}
                  type="button"
                  className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((r) => r.url));
            }}
            onUploadError={(e) => {
              alert("Something went wrong");
              console.log(e);
            }}
          />
        )}

        <p className="text-red-500">{fields.logo.errors}</p>
      </div>
      <SubmitButton variant="default" text="Finish" />
    </form>
  );
}

export function DeleteBrandForm({ data }: BrandEditData) {
  return (
    <form action={deleteBrand}>
      <input type="hidden" name="brandId" value={data.id} />
      <SubmitButton variant="destructive" text="Delete Product" />
    </form>
  );
}
