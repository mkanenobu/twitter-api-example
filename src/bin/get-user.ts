import { twitterClient } from "../lib/twitter-client";

const main = async () => {
  // by username
  const user = await twitterClient.userByUsername("mkane_1000");
  console.log(user.data);
};

main();
