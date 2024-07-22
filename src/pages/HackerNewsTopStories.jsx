import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpCircle, ExternalLink } from "lucide-react";

const fetchTopStories = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  return storyIds.slice(0, 100);
};

const fetchStory = async (id) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return response.json();
};

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

const HackerNewsTopStories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: topStoryIds, isLoading: isLoadingIds } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
  });

  const { data: stories, isLoading: isLoadingStories } = useQuery({
    queryKey: ["stories", topStoryIds],
    queryFn: async () => {
      if (!topStoryIds) return [];
      return Promise.all(topStoryIds.map(fetchStory));
    },
    enabled: !!topStoryIds,
  });

  const filteredStories = stories?.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Hacker News Top 100 Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      {isLoadingIds || isLoadingStories ? (
        Array(10)
          .fill()
          .map((_, index) => (
            <Card key={index} className="mb-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-12" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))
      ) : (
        filteredStories?.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))
      )}
    </div>
  );
};

export default HackerNewsTopStories;