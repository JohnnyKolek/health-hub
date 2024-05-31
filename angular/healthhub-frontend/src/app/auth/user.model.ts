export class User {
  constructor(
    public email: string,
    public id: number,
    private _token: string,
    private _tokenExpirationDate: Date,
    public roles: string[]
  ) {
  }

  get token(): null | string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token
  }

}
