export class NewClient {
  public name: string | undefined;
  public primary_email: string | undefined;
  public licenses: number | undefined;
  public containers: string[] | undefined;

  constructor(init?: Partial<NewClient>) {
    Object.assign(this, init);
  }
  /**
   * Checks if we have all the required information to sign up
   *
   * @returns {boolean} True if all the information is present
   *
   */
  checkInfo(): boolean {
    return (
      this.name != undefined && this.name != "",
      this.primary_email != undefined && this.primary_email != "",
      this.licenses != undefined,
      this.containers != undefined
    );
  }
}
