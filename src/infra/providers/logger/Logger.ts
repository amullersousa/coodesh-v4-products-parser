export interface Logger {
  setDefaultMeta<M extends any>(meta: M): void
  info(info?: any): void
  error(error?: any): void
  empty(): void
}
