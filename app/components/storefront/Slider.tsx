"use client";

import { Banner } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const bgColors = [
  "bg-gradient-to-r from-yellow-50 to-pink-50",
  "bg-gradient-to-r from-pink-50 to-blue-50",
  "bg-gradient-to-r from-blue-50 to-yellow-50",
];

interface SliderProps {
  banners: Banner[];
}

const Slider = ({ banners }: SliderProps) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden rounded-lg">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {banners.map((slide, index) => (
          <div
            className={`${
              bgColors[index > bgColors.length ? 0 : index]
            } w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-2xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-5xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url || "#"}>
                <button className="rounded-md bg-black text-white py-3 px-4 ">
                  SHOP NOW
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.imageString}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {banners.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
