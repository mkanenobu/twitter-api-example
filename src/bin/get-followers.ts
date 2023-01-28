import { twitterClient } from "../lib/twitter-client";
import type { UserV2 } from "twitter-api-v2";
import { redisClient } from "../lib/redis";

const main = async () => {
  const user = await twitterClient.userByUsername("mkane_1000");

  const followers: UserV2[] = [];

  let done = false;
  let paginationToken: string | undefined;

  while (!done) {
    console.log({ paginationToken });
    const res = await twitterClient.followers(user.data.id, {
      asPaginator: true,
      pagination_token: paginationToken,
    });

    paginationToken = res.meta.next_token;
    followers.push(...res.users);
    done = res.done;
  }
  await redisClient.disconnect();

  console.dir(followers, { depth: null });
  console.log(followers.length);
};

main();
