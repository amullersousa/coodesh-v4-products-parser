export interface GetAppInfoResponseDTO {
  uptime: string
  memoryUsage: {
    rss: string
    heapTotal: string
    heapUsed: string
    external: string
  }
}
