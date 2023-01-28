import { twitterClient } from "../lib/twitter-client";
import type { UserV2 } from "twitter-api-v2";
import { redisClient } from "../lib/redis";

const main = async () => {
  const user = await twitterClient.userByUsername("mkane_1000");

  const followingNames: UserV2[] = [];
  let paginationToken: string | undefined;
  let done = false;

  while (!done) {
    const res = await twitterClient.following(user.data.id, {
      asPaginator: true,
      pagination_token: paginationToken,
    });
    paginationToken = res.meta.next_token;
    followingNames.push(...res.users);
    done = res.done;
  }
  await redisClient.disconnect();

  console.dir(followingNames, { depth: null });
  console.log("Length of following", followingNames.length);
};

main();
