export class Login {
  public iat: string;
  public exp: string;
  public token: string;

  constructor(iat: string, exp: string, token: string) {
    this.iat = iat;
    this.exp = exp;
    this.token = token;
  }
}
