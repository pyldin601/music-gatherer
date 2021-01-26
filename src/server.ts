import {Config} from "./Config";
import {RedisClient} from "./RedisClient";

async function main(): Promise<void> {
  const config = new Config(process.env)
  const redisClient = new RedisClient(config.redisHost, config.redisPort)
}

main()
