export class NewUser {
  public email: string | undefined;
  public firstname: string | undefined;
  public lastname: string | undefined;
  public password: string | undefined;
  public client_id: number | undefined;
  public role: number | undefined;
  public designation: string | undefined;

  constructor(init?: Partial<NewUser>) {
    Object.assign(this, init);
  }
  /**
   * Checks if we have all the required information to sign up
   *
   * @returns {boolean} True if all the information is present
   * @memberof SignUp
   */
  checkInfo(): boolean {
    return (
      this.email != undefined &&
      this.firstname != undefined &&
      this.lastname != undefined &&
      this.client_id != undefined
    );
  }
}
