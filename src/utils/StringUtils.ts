export type StringUtilsProps = { [key: string]: string }
export type StringUtilsGroupReplaceValue = { [key: string]: string }

export class StringUtils {
  /**
   * This function called replace performs text replacement using values ​​from
   * an object to fill placeholders within a string. Here is a detailed explanation
   * of how it works:
   * @param value The original string that contains placeholders. Placeholders are defined as [key], where "key"
   * corresponds to a property within the props object.
   *
   * @param props An object that contains key-value pairs. The keys correspond to the placeholders in the value string,
   * and the values ​​are the desired replacements.
   *
   * @returns string
   *
   * Example:
   *
   *  const template = "Hello, [name]! Your score is [score].";
   *  const props = {
   *    name: "Mike",
   *    score: "95"
   *  };
   *
   *  const result = StringUtils.replace(template, props);
   *  console.log(result);  // "Hello, Mike! Your score is 95."
   *
   */
  public static replace(value: string, props: StringUtilsProps): string {
    Object.keys(props).forEach(key => {
      value = value.replace(`[${key}]`, props[key])
    })

    return value
  }

  /**
   * The `groupReplace` function performs text replacement on multiple properties of an object
   * using values from another object to fill placeholders within each property's string.
   * It iterates over each key in the `value` object and applies the `replace` function from
   * the `StringUtils` class to perform the substitution.
   *
   * @template T The type of the object being modified and returned.
   *
   * @param value An object where each property value is a string containing placeholders.
   *              These placeholders are defined as `[key]`, where "key" corresponds to a
   *              property within the `props` object.
   *
   * @param props An object that contains key-value pairs. The keys correspond to the placeholders
   *              in the strings within the `value` object, and the values are the desired replacements.
   *
   * @returns T The modified object with all placeholders replaced by their corresponding values from the `props` object.
   *
   * Example:
   *
   *  const templateObj = {
   *    greeting: "Hello, [name]!",
   *    scoreMessage: "Your score is [score]."
   *  };
   *
   *  const props = {
   *    name: "Mike",
   *    score: "95"
   *  };
   *
   *  const result = StringUtils.groupReplace(templateObj, props);
   *  console.log(result);
   *  // {
   *  //   greeting: "Hello, Mike!",
   *  //   scoreMessage: "Your score is 95."
   *  // }
   *
   */
  public static groupReplace<T>(
    value: StringUtilsGroupReplaceValue,
    props: StringUtilsProps
  ): T {
    Object.keys(value).forEach(key => {
      value[key] = StringUtils.replace(value[key], props)
    })

    return value as T
  }
}
