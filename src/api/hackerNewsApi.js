export const fetchTopStories = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  return storyIds.slice(0, 100);
};

export const fetchStory = async (id) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return response.json();
};

export const fetchStories = async (storyIds) => {
  if (!storyIds) return [];
  return Promise.all(storyIds.map(fetchStory));
};