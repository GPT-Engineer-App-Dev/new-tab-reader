import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, ExternalLink } from "lucide-react";

const StoryItem = ({ story }) => (
  <Card className="mb-4">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline flex items-center"
        >
          {story.title}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </CardTitle>
      <div className="flex items-center text-sm text-muted-foreground">
        <ArrowUpCircle className="mr-1 h-4 w-4" />
        {story.score}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        By {story.by} | {story.descendants} comments
      </p>
    </CardContent>
  </Card>
);

export default StoryItem;