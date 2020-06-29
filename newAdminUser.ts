import { AdminPrivileges } from "./adminPrivileges";

export class NewAdminUser {
  public email: string | undefined;
  public first_name: string | undefined;
  public last_name: string | undefined;
  public password: string | undefined;
  public privileges: AdminPrivileges | undefined;

  constructor(init?: Partial<NewAdminUser>) {
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
      this.first_name != undefined &&
      this.last_name != undefined
    );
  }
}
