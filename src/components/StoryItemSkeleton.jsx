import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StoryItemSkeleton = () => (
  <Card className="mb-4">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-12" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-1/2" />
    </CardContent>
  </Card>
);

export default StoryItemSkeleton;