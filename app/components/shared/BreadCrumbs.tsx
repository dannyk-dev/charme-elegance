"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Slash } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

interface BreadCrumbsProps {
  productName?: string;
  categoryName?: string;
  brandName?: string;
}

function BreadCrumbs({
  productName,
  categoryName,
  brandName,
}: BreadCrumbsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  const pathSegments = pathname.split("/").filter(Boolean); // `filter(Boolean)` removes empty segments

  const formatSegment = (segment: string) => {
    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <Breadcrumb className="mb-4 mt-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>

          {categoryName && (
            <>
              <BreadcrumbItem>
                {/* <span>{categoryName}</span> */}
                <BreadcrumbPage className="capitalize">
                  {categoryName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {brandName && (
            <>
              <BreadcrumbItem>
                {/* <span>{brandName}</span> */}
                <BreadcrumbPage className="capitalize">
                  {brandName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {category && productName && (
            <>
              {/* <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator> */}
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/products/${category}`}
                  className="capitalize"
                >
                  {category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">
                  {productName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {brand && productName && (
            <>
              {/* <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator> */}
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/products/${brand}`}
                  className="capitalize"
                >
                  {brand}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {/* <span>{productName}</span> */}
                <BreadcrumbPage className="capitalize">
                  {productName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {!categoryName &&
            !brandName &&
            !productName &&
            pathSegments.length > 0 &&
            pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                {/* <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator> */}
                <BreadcrumbItem>
                  {index < pathSegments.length - 1 ? (
                    <BreadcrumbLink
                      href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                    >
                      {formatSegment(segment)}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}

export default BreadCrumbs;
