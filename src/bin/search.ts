import { twitterClient } from "../lib/twitter-client";

const main = async (query: string) => {
  const result = await twitterClient.search(query);
  console.log(result.data);
};

main("test");
