export class ObjectUtils {
  public static reduce(
    origial: Record<string, any>,
    propertyKeys: Array<string>
  ): Record<string, any> {
    return Object.keys(origial).reduce(function (obj: any, key: string) {
      if (propertyKeys.indexOf(key) === -1) {
        obj[key] = origial[key]
      }
      return obj
    }, {})
  }

  public static merge<A, B>(a: A, b: B): A & B {
    return Object.assign({}, a, b)
  }

  public static copy<A>(a: A): A {
    return Object.assign({}, a)
  }

  public static has<A>(objectA: A, prop: string): boolean {
    return Object.prototype.hasOwnProperty.call(objectA, prop)
  }
}
