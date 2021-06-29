import * as restify from "restify";
import { AdminPrivileges } from ".";

/**
 * Abstract interface that all session classes implement
 */
 export interface ISession {
  email: string;
  id: number;
  session_type: string;
}

// export interface AdminSession extends ISession {
//   email: string;
//   id: number;
//   privileges: AdminPrivileges;
//   session_type: "AdminSession";
// }

export class Session implements ISession {
  constructor(email: string, id: number, role: number, client_id: number) {
    this.email = email;
    this.id = id;
    this.role = role;
    this.client_id = client_id;
    this.session_type = "Session";
  }

  /**
   * The email for this account
   *
   * @type {string}
   * @memberof Session
   */
  public email: string;

  /**
   * ID that is unique to an account
   *
   * @type {string}
   * @memberof Session
   */
  public id: number;

  /**
   * Role indicates user privileges within client
   *
   * @type {number}
   * @memberof Session
   */
  public role: number;

  /**
   * ID that is unique to an account
   *
   * @type {number}
   * @memberof Session
   */
  public client_id: number;

  /**
   * Type of session for serialization
   *
   * @type {"Session"}
   * @memberof Session
   */
  public session_type: "Session";

  public static getSessionFromRequest(
    request: restify.Request
  ): Session | null {
    if ((request as any).user?.session_type === "Session") {
      return (request as any).user as Session;
    }
    return null;
  }
}

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
  public privileges: AdminPrivileges;

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
