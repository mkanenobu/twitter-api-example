import { createClient, type RedisClientType } from "redis";
import { env } from "./env";

export const redisClient: RedisClientType = createClient({
  url: env?.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
