"use client";

import React from "react";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type Props = {
  images: string[];
};

function ProductImageCarousel({ images }: Props) {
  return (
    <Carousel
      className="w-full mx-auto"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        {images &&
          images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[300px]">
                <Image
                  src={item}
                  alt="Product Image"
                  fill
                  className="object-cover object-center w-full h-full rounded-lg "
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ProductImageCarousel;
