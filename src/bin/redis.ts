import { redisClient } from "../lib/redis";

const main = async () => {
  await redisClient.connect();
  await redisClient.set("foo", "bar");
  const res = await redisClient.get("foo");
  console.log({ res });
  await redisClient.disconnect();
};

main();
