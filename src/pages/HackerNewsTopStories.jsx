import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import StoryList from "../components/StoryList";
import { fetchTopStories } from "../api/hackerNewsApi";

const HackerNewsTopStories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: topStoryIds, isLoading: isLoadingIds } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
  });

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
      <StoryList
        topStoryIds={topStoryIds}
        isLoadingIds={isLoadingIds}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default HackerNewsTopStories;