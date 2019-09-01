export default class APICode extends Error {
  public code: number;

  constructor(code = 0) {
    super('An api error happened');
    this.code = code;
  }
}
