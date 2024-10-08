"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, brandSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";
import slugify from "slugify";

async function getNextSkuCount(): Promise<number> {
  const lastProduct = await prisma.product.findFirst({
    orderBy: {
      skuCount: "desc",
    },
    select: {
      skuCount: true,
    },
  });

  return lastProduct ? lastProduct.skuCount + 1 : 1;
}

function getInitials(str: string): string {
  return str
    .split(" ")
    .map((word) => word[0].toLowerCase())
    .join("");
}

export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "kruger.dkk@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const brand = await prisma.brand.findUnique({
    where: { id: submission.value.brandId },
  });

  if (!brand) {
    throw new Error("Brand not found");
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const skuCount = await getNextSkuCount();
  const brandAbbreviation = getInitials(brand.name);
  // const productAbbreviation = getInitials(submission.value.name);
  const productSlug = slugify(submission.value.name, { lower: true });
  const sku = `${brandAbbreviation}-${productSlug}-${skuCount}`;

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      brand: {
        connect: {
          id: submission.value.brandId,
        },
      },
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
      gender: submission.value.gender,
      size: submission.value.size || null,
      skuCount,
      sku,
    },
  });
  redirect("/dashboard/products");
}

export async function editProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "kruger.dkk@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      price: submission.value.price,
      brand: {
        connect: {
          id: submission.value.brandId,
        },
      },
      isFeatured: submission.value.isFeatured === true ? true : false,
      status: submission.value.status,
      images: flattenUrls,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "kruger.dkk@gmail.com") {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "kruger.dkk@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      description: submission.value.description,
      imageString: submission.value.imageString,
      url: submission.value.url,
    },
  });

  revalidatePath("/", "page");
  redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "kruger.dkk@gmail.com") {
    return redirect("/");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  redirect("/dashboard/banner");
}

export async function addItem(productId: string, quantity?: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);
  let wishlist: Cart | null = await redis.get(`wishlist-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      size: true,
      brand: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product with this id");
  }

  if (!quantity) {
    throw new Error("Not a valid quantity");
  }

  const hasWishlist =
    (wishlist &&
      wishlist.items.some((item) => {
        if (item.id === selectedProduct.id && item.hasWishlist) {
          return true;
        }

        return false;
      })) ||
    false;

  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          brand: selectedProduct.brand,
          quantity,
          size: selectedProduct.size,
          hasWishlist,
        },
      ],
    };
  } else {
    let itemFound = false;

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += quantity;
      }

      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        brand: selectedProduct.brand,
        size: selectedProduct.size,
        hasWishlist,
      });
    }
  }

  await redis.set(`cart-${user.id}`, myCart);

  revalidatePath("/", "layout");
}

export async function editItemQuantity(productId: string, newQuantity: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (!cart || !cart.items) {
    throw new Error("Cart is empty");
  }

  let itemFound = false;
  cart.items = cart.items
    .map((item) => {
      if (item.id === productId) {
        itemFound = true;
        if (newQuantity > 0) {
          item.quantity = newQuantity;
        }
        return item;
      }
      return item;
    })
    .filter((item) => item.quantity > 0);

  if (!itemFound) {
    throw new Error("Item not found in cart");
  }

  await redis.set(`cart-${user.id}`, cart);

  revalidatePath("/", "layout");
  revalidatePath("/bag", "page");
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${user.id}`, updateCart);
  }

  revalidatePath("/bag");
}

export async function addToWishlist(productId: string, quantity: number = 1) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let wishlist: Cart | null = await redis.get(`wishlist-${user.id}`);
  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      size: true,
      brand: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("No product with this id");
  }

  let myWishlist = {} as Cart;

  if (!wishlist || !wishlist.items) {
    // Initialize wishlist if empty
    myWishlist = {
      userId: user.id,
      items: [
        {
          price: selectedProduct.price,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          brand: selectedProduct.brand,
          quantity,
          size: selectedProduct.size,
          hasWishlist: true,
        },
      ],
    };
  } else {
    let itemFound = false;

    myWishlist.items = wishlist.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += quantity;
      }
      return item;
    });

    if (!itemFound) {
      myWishlist.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        brand: selectedProduct.brand,
        size: selectedProduct.size,
        hasWishlist: true,
      });
    }
  }

  await redis.set(`wishlist-${user.id}`, myWishlist);

  // cart

  if (cart && cart.items) {
    cart.items = cart.items.map((item) => {
      if (item.id === productId) {
        item.hasWishlist = true;
      }
      return item;
    });
  }

  await redis.set(`cart-${user.id}`, cart);

  revalidatePath("/", "layout");
  revalidatePath("/bag", "page");
}

export async function delWishlistItem(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const productId = formData.get("productId");

  let wishlist: Cart | null = await redis.get(`wishlist-${user.id}`);
  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (wishlist && wishlist.items) {
    const updatedWishlist: Cart = {
      userId: user.id,
      items: wishlist.items.filter((item) => item.id !== productId),
    };

    await redis.set(`wishlist-${user.id}`, updatedWishlist);
  }

  if (cart && cart.items) {
    cart.items = cart.items.map((item) => {
      if (item.id === productId) {
        item.hasWishlist = false;
      }
      return item;
    });

    await redis.set(`cart-${user.id}`, cart);
  }

  revalidatePath("/", "layout");
  revalidatePath("/bag", "page");
}

export async function checkOut(deliveryMethod: "PICKUP" | "DELIVERY") {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/success"
          : "https://shoe-marshal.vercel.app/payment/success",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/payment/cancel"
          : "https://shoe-marshal.vercel.app/payment/cancel",
      metadata: {
        userId: user.id,
        deliveryMethod,
      },
    });

    return redirect(session.url as string);
  }
}

export async function createBrand(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "kruger.dkk@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: brandSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.brand.create({
    data: {
      name: submission.value.name,
      logo: submission.value.logo[0],
    },
  });

  redirect("/dashboard/products");
}

export async function editBrand(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "kruger.dkk@gmail.com") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: brandSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const brandId = formData.get("brandId") as string;
  await prisma.brand.update({
    where: {
      id: brandId,
    },
    data: {
      name: submission.value.name,
      logo: submission.value.logo[0],
    },
  });

  redirect("/dashboard/products");
}

export async function deleteBrand(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "kruger.dkk@gmail.com") {
    return redirect("/");
  }

  await prisma.brand.delete({
    where: {
      id: formData.get("brandId") as string,
    },
  });

  redirect("/dashboard/products");
}
