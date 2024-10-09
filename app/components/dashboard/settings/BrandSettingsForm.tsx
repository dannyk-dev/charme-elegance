"use client";

import { createProduct } from "@/app/actions";
import { UploadDropzone } from "@/app/lib/uplaodthing";
import { brandSettingsSchema, productSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { useFormState } from "react-dom";
import "react-color-palette/css";

interface BrandSettingsFormProps {}

type ColorSettings = {
  primary_color?: string;
  foreground_color?: string;
  accent_color?: string;
};

function BrandSettingsForm({}: BrandSettingsFormProps) {
  const [logoHeader, setLogoHeader] = useState<string[]>([]);
  const [logoFooter, setLogoFooter] = useState<string[]>([]);
  // const [colorSettings, setColorSettings] = useState<ColorSettings>({});
  const [primaryColor, setPrimaryColor] = useColor("");
  const [foregroundColor, setForegroundColor] = useColor("");
  const [accentColor, setAccentColor] = useColor("");

  const [lastResult, action] = useFormState(createProduct, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: brandSettingsSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteLogoHeader = () => {
    setLogoHeader([]);
  };

  const handleDeleteLogoFooter = () => {
    setLogoFooter([]);
  };

  return (
    <form action="">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Site Settings</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Brand Settings</CardTitle>
          <CardDescription>Customize your brand here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl">Logos</h2>
            <div className="flex gap-x-6">
              <div className="flex flex-col gap-y-3">
                <Label>Header Logo</Label>
                <input
                  type="hidden"
                  value={logoHeader}
                  key={fields.logo_header.key}
                  name={fields.logo_header.name}
                  defaultValue={fields.logo_header.initialValue as any}
                />
                {logoHeader.length > 0 ? (
                  <div className="flex gap-5">
                    {logoHeader.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-[100px] h-[100px] "
                      >
                        <Image
                          height={100}
                          width={100}
                          src={image}
                          alt="Product Image"
                          className="w-full h-full object-cover  border rounded-full"
                        />

                        <button
                          onClick={() => handleDeleteLogoHeader()}
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
                      setLogoHeader(res.map((r) => r.url));
                    }}
                    onUploadError={(e) => {
                      alert("Something went wrong");
                      console.log(e);
                    }}
                  />
                )}

                <p className="text-red-500">{fields.logo_header.errors}</p>
              </div>
              <div className="flex flex-col gap-y-3">
                <Label>Footer Logo</Label>
                <input
                  type="hidden"
                  value={logoFooter}
                  key={fields.logo_footer.key}
                  name={fields.logo_footer.name}
                  defaultValue={fields.logo_footer.initialValue as any}
                />
                {logoFooter.length > 0 ? (
                  <div className="flex gap-5">
                    {logoFooter.map((image, index) => (
                      <div key={index} className="relative w-[100px] h-[100px]">
                        <Image
                          height={100}
                          width={100}
                          src={image}
                          alt="Product Image"
                          className="w-full h-full object-cover rounded-lg border"
                        />

                        <button
                          onClick={() => handleDeleteLogoFooter()}
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
                      setLogoFooter(res.map((r) => r.url));
                    }}
                    onUploadError={(e) => {
                      alert("Something went wrong");
                      console.log(e);
                    }}
                  />
                )}

                <p className="text-red-500">{fields.logo_header.errors}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-10">
            <h2 className="text-xl mb-2">Brand Colors</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-y-3">
                <Label>Primary Color</Label>
                <input
                  type="hidden"
                  name="primary_color"
                  value={primaryColor.hex}
                />
                <ColorPicker
                  color={primaryColor}
                  onChange={setPrimaryColor}
                  hideInput={["hsv"]}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <Label>Foreground Color</Label>
                <input
                  type="hidden"
                  name="foreground_color"
                  value={foregroundColor.hex}
                />
                <ColorPicker
                  color={foregroundColor}
                  onChange={setForegroundColor}
                  hideInput={["hsv"]}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <Label>Accent Color</Label>
                <input
                  type="hidden"
                  name="accent_color"
                  value={accentColor.hex}
                />
                <ColorPicker
                  color={accentColor}
                  onChange={setAccentColor}
                  hideInput={["hsv"]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export default BrandSettingsForm;
