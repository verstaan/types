export class Login {
  // public iat: string;
  // public exp: string;
  public token: string;
  public refreshToken: string;

  constructor(token: string, refreshToken: string) {
    // this.iat = iat;
    // this.exp = exp;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
