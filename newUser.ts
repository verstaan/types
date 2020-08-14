export class NewUser {
  public email: string | undefined;
  public firstname: string | undefined;
  public lastname: string | undefined;
  public password: string | undefined;
  public client_id: number | undefined;
  public team_id?: number | null | undefined;
  public role: number | undefined;
  public designation: string | null | undefined;
  public nickname?: string | undefined;
  public position?: string | undefined;
  public address_home?: string | undefined;
  public phone_cell?: string | undefined;
  public phone_work?: string | undefined;
  public phone_home?: string | undefined;
  public emergency_contact?: string | undefined;
  public emergency_contact_relationship?: string | undefined;
  public emergency_phone_home?: string | undefined;
  public emergency_phone_cell?: string | undefined;
  public emergency_phone_work?: string | undefined;

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
      this.email !== undefined &&
      this.firstname !== undefined &&
      this.lastname !== undefined &&
      this.client_id !== undefined
    );
  }
}
