import * as restify from "restify";
import { ISession } from ".";

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
