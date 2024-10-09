import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingAbout() {
  return <TextSkeleton />;
}

const TextSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4" /> {/* Title or Header */}
      <Skeleton className="h-4 w-full" /> {/* First line of text */}
      <Skeleton className="h-4 w-5/6" /> {/* Second line of text */}
      <Skeleton className="h-4 w-4/6" /> {/* Third line of text */}
      <Skeleton className="h-4 w-full" /> {/* Fourth line of text */}
      <Skeleton className="h-4 w-2/3" /> {/* Fifth line of text */}
    </div>
  );
};
