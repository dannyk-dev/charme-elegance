import prisma from "@/app/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Slider from "./Slider";
import Link from "next/link";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const bgColors = [
  "bg-gradient-to-r from-yellow-50 to-pink-50",
  "bg-gradient-to-r from-pink-50 to-blue-50",
  "bg-gradient-to-r from-blue-50 to-yellow-50",
];

export async function Hero() {
  const data = await getData();

  return (
    <Carousel>
      <CarouselContent className="h-screen w-full">
        {data.map((banner, index) => (
          <CarouselItem key={banner.id} className="w-full">
            <div
              className={`${
                bgColors[index > bgColors.length - 1 ? 0 : index]
              } w-full h-full grid lg:grid-cols-2 rounded-lg`}
            >
              <div className="h-1/2 w-full xl:h-full flex flex-col items-center justify-center gap-y-8 2xl:gap-y-12 text-center">
                <h2 className="text-xl lg:text-2xl 2xl:text-5xl">
                  {banner.description}
                </h2>
                <h1 className="text-5xl lg:text-5xl 2xl:text-8xl font-semibold">
                  {banner.title}
                </h1>
                <Link href={banner.url || "#"}>
                  <button className="rounded-md bg-black text-white py-3 px-4 ">
                    SHOP NOW
                  </button>
                </Link>
              </div>
              {/* IMAGE CONTAINER */}
              <div className="h-1/2 w-full  xl:h-full relative">
                <Image
                  src={banner.imageString}
                  alt=""
                  fill
                  sizes="100%"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
  // return <Slider banners={data} />;
}
