export class Config {
  public readonly tempDirectoryForTorrents: string
  public readonly tempDirectoryForDownloads: string
  public readonly redisHost: string
  public readonly redisPort: number

  constructor(env: Record<string, string | undefined>) {
    if (!env.TEMP_DIRECTORY_FOR_TORRENTS) {
      throw new TypeError('Environment variable TEMP_DIRECTORY_FOR_TORRENTS is required for operation')
    }
    this.tempDirectoryForTorrents = env.TEMP_DIRECTORY_FOR_TORRENTS

    if (!env.TEMP_DIRECTORY_FOR_DOWNLOADS) {
      throw new TypeError('Environment variable TEMP_DIRECTORY_FOR_DOWNLOADS is required for operation')
    }
    this.tempDirectoryForDownloads = env.TEMP_DIRECTORY_FOR_DOWNLOADS

    if (!env.REDIS_HOST || !env.REDIS_PORT) {
      throw new TypeError('Environment variables REDIS_HOST and REDIS_PORT are required for operation')
    }
    this.redisHost = env.REDIS_HOST
    this.redisPort = parseInt(env.REDIS_PORT, 10)
  }
}
