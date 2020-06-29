import * as restify from "restify";
import { AdminPrivileges } from "./adminPrivileges";
import { ISession } from ".";

/**
 * A session of an admin user on admin.arcturus. Distinct from Orion sessions that are represented by the Session class
 */
export class AdminSession implements ISession {
  constructor(email: string, id: number, privileges: AdminPrivileges) {
    this.email = email;
    this.id = id;
    this.privileges = privileges;
    this.session_type = "AdminSession";
  }

  /**
   * The email for this admin user
   *
   * @type {string}
   * @memberof AdminSession
   */
  public email: string;

  /**
   * ID that is unique to an account
   *
   * @type {string}
   * @memberof AdminSession
   */
  public id: number;

  /**
   * How many privileges this admin user has
   * 0 = normal admin user who can only view reports from Forms they are the primay_manager of
   * 1 = superuser who can view all reports
   *
   * @type {number}
   * @memberof AdminSession
   */
  public privileges: number;

  /**
   * Type of session for serialization
   *
   * @type {"AdminSession"}
   * @memberof Session
   */
  public session_type: "AdminSession";

  public static getSessionFromRequest(
    request: restify.Request
  ): AdminSession | null {
    if ((request as any).user?.session_type === "AdminSession") {
      return (request as any).user as AdminSession;
    }
    return null;
  }
}
