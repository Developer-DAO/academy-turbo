export const createTwitterIntentLink = (tweetContent: string): string => {
  const baseUrl = "https://twitter.com/intent/tweet";
  const encodedContent = encodeURIComponent(tweetContent);
  return `${baseUrl}?text=${encodedContent}`;
};
