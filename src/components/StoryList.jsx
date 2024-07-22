import { useQuery } from "@tanstack/react-query";
import { fetchStories } from "../api/hackerNewsApi";
import StoryItem from "./StoryItem";
import StoryItemSkeleton from "./StoryItemSkeleton";

const StoryList = ({ topStoryIds, isLoadingIds, searchTerm }) => {
  const { data: stories, isLoading: isLoadingStories } = useQuery({
    queryKey: ["stories", topStoryIds],
    queryFn: () => fetchStories(topStoryIds),
    enabled: !!topStoryIds,
  });

  const filteredStories = stories?.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoadingIds || isLoadingStories) {
    return Array(10).fill().map((_, index) => <StoryItemSkeleton key={index} />);
  }

  return filteredStories?.map((story) => (
    <StoryItem key={story.id} story={story} />
  ));
};

export default StoryList;