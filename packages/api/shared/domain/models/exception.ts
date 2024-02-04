class Exception extends Error {
  private constructor(message: string) {
    super(message)
  }

  static with(message: string) {
    return new this(message)
  }
}

export default Exception
