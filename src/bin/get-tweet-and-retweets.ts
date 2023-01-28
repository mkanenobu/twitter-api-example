import { twitterClient } from "../lib/twitter-client";
import { redisClient } from "../lib/redis";

const main = async () => {
  const elon = await twitterClient.userByUsername("elonmusk");
  const elonsLatestTweet = (
    await twitterClient.userTimeline(elon.data.id, {
      max_results: 5,
    })
  ).data.data.at(0)!;
  console.dir(elonsLatestTweet, { depth: null });

  const retweets = await twitterClient.tweetRetweetedBy(elonsLatestTweet.id);
  console.dir(retweets.data, { depth: null });
  await redisClient.disconnect();
};

main();
