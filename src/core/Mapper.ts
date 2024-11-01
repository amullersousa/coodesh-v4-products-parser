import { Result } from "./Result";

export interface Mapper<D, R> {
  map(data: D): Promise<Result<R>> | Result<R>
}
