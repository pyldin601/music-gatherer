import IORedis from 'ioredis'

export class RedisClient {
  private ioredis = new IORedis(this.redisPort, this.redisHost)

  constructor(private readonly redisHost: string, private readonly redisPort: number) {
  }

  public async disconnect(): Promise<void> {
    this.ioredis.disconnect()
  }
}
