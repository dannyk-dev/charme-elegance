import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Props = {};

function FooterCard({}: Props) {
  return (
    <Card className="flex flex-col justify-around bg-amber-50 text-amber-900 md:p-4">
      <CardHeader>
        <div className="w-full md:w-4/5 mx-auto">
          <CardTitle className="text-3xl mb-2 text-left">
            Charm & Elegance
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col gap-y-2 text-left w-full md:w-4/5 mx-auto">
          <h2 className="text-lg font-bold tracking-tight ">Our Collection:</h2>
          <p className="tracking-wide">
            Indulge in captivating scents that leave a lasting impression,
            whether you're looking for a bold, masculine fragrance or a
            delicate, feminine scent. Each perfume is designed to elevate your
            senses and complement your unique style.
          </p>
        </div>
        <div className="flex flex-col gap-y-2  text-left w-full md:w-4/5 mx-auto">
          <h2 className="text-lg font-bold tracking-tight">
            Explore Our Signature Fragrances Today
          </h2>
          <p className="tracking-wide">
            Let your fragrance tell your story. Shop now and find the perfect
            scent that speaks to your elegance and charm.
          </p>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button
            asChild
            variant="secondary"
            className="text-lg w-full md:w-1/5"
          >
            <Link href="/products/all">Shop Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default FooterCard;
