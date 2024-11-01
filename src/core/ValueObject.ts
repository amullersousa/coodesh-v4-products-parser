type ValueObjectProps = Record<string, any>

export abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly props: T

  constructor(props: T) {
    this.props = props
  }
}
