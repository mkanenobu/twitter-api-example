import { TwitterApi } from "twitter-api-v2";
import { TwitterApiCachePluginRedis } from "@twitter-api-v2/plugin-cache-redis";
import { redisClient } from "./redis";
import { env } from "./env";

const BEARER_TOKEN = env?.BEARER_TOKEN;

if (typeof BEARER_TOKEN === "undefined") {
  throw new Error("BEARER_TOKEN is not set");
}

export const twitterClient = new TwitterApi(BEARER_TOKEN, {
  // caching with redis
  plugins: [new TwitterApiCachePluginRedis(redisClient)],
}).v2.readOnly;
