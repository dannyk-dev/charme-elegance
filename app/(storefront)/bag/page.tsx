import { checkOut } from "@/app/actions";
import { ChceckoutButton } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Info, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BreadCrumbs from "@/app/components/shared/BreadCrumbs";
import SupportContactCard from "@/app/components/storefront/SupportContactCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WishList from "@/app/components/storefront/WishList";
import CartItemCard from "@/app/components/storefront/CartItemCard";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";

export default async function BagRoute() {
  // noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  return (
    <div className="w-full mx-auto mt-10 min-h-[55vh] ">
      <BreadCrumbs />
      {!cart || !cart?.items || cart.items.length < 1 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mt-20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            You dont have any products in your Bag
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any products in your shopping bag. Please
            add some so that you can see them right here.
          </p>

          <Button asChild>
            <Link href="/">Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className="flex-col-reverse flex md:flex-row justify-between md:gap-x-12">
          <div className="flex flex-col gap-y-10 w-full md:w-8/12  ">
            {cart?.items.map((item) => (
              <CartItemCard item={item} key={item.id} />
            ))}
            <WishList />
          </div>
          <div className="flex flex-col w-full md:w-4/12 gap-y-4 ">
            <OrderSummary items={cart?.items} />
            <SupportContactCard />
          </div>
        </div>
      )}

      <FeaturedProducts />
    </div>
  );
}

interface OrderSummaryProps {
  items?: Cart["items"];
}

async function OrderSummary({ items = [] }: OrderSummaryProps) {
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <Card className=" w-full  bg-amber-50">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Some Description Here</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between font-medium">
          <p>Delivery Fee:</p>
          <p>Included</p>
        </div>
        <div className="flex items-center justify-between font-medium">
          <p>Subtotal:</p>
          <p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
        </div>

        <div className="flex items-center justify-between font-medium mt-4">
          <h1 className="text-lg font-bold">Estimated Total:</h1>
          <h1 className="text-lg font-bold">
            ${new Intl.NumberFormat("en-US").format(totalPrice)}
          </h1>
        </div>

        <form
          className="w-full"
          action={async (formData) => {
            "use server";
            const deliveryMethod = formData.get("deliveryMethod");

            await checkOut(
              (deliveryMethod as "PICKUP" | "DELIVERY") || "DELIVERY"
            );
          }}
        >
          <div className="flex flex-col mt-8 w-full">
            {/* <FormLabel */}
            {/* <FormLabel>How would you like to receive your order?</FormLabel> */}
            <h1 className="block font-medium mb-1.5">
              How would you like to receive your order?
            </h1>
            <RadioGroup
              defaultValue="DELIVERY"
              name="deliveryMethod"
              className="w-full gap-0"
            >
              <div className="flex items-center  justify-between w-full">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="DELIVERY" id="DELIVERY" />
                  <Label htmlFor="DELIVERY">Delivery</Label>
                </div>

                <TooltipProvider>
                  <Tooltip delayDuration={400}>
                    <Button
                      variant="link"
                      size="icon"
                      asChild
                      className="justify-end"
                    >
                      <TooltipTrigger>
                        <Info />
                      </TooltipTrigger>
                    </Button>
                    <TooltipContent>
                      <p>Costs Included</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PICKUP" id="PICKUP" />
                  <Label htmlFor="PICKUP">Pickup</Label>
                </div>

                <TooltipProvider>
                  <Tooltip delayDuration={400}>
                    <Button
                      variant="link"
                      size="icon"
                      asChild
                      className="justify-end"
                    >
                      <TooltipTrigger>
                        <Info />
                      </TooltipTrigger>
                    </Button>
                    <TooltipContent>
                      <p>Products Should be fetched from our stores</p>
                      <Button
                        asChild
                        variant="link"
                        size="sm"
                        className="p-0 underline"
                      >
                        <Link href="#">Find our stores</Link>
                      </Button>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </RadioGroup>
          </div>

          <ChceckoutButton />
        </form>
      </CardContent>
    </Card>
  );
}
