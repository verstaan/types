export interface NewUser {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  client_id: number;
  team_id?: number | null;
  role: number;
  designation?: string | null;
  nickname?: string;
  position?: string;
  address_home?: string;
  phone_cell?: string;
  phone_work?: string;
  phone_home?: string;
  emergency_contact?: string;
  emergency_contact_relationship?: string;
  emergency_phone_home?: string;
  emergency_phone_cell?: string;
  emergency_phone_work?: string;
}

/**
* Checks if we have all the required information to sign up
*
* @returns {boolean} True if all the information is present
* @memberof SignUp
*/
export function checkNewUserInfo(newUser: NewUser): boolean {
  if (typeof (newUser.email) !== "string" || typeof (newUser.firstname) !== "string" ||
    typeof (newUser.lastname) !== "string" || newUser.email === undefined ||
    newUser.firstname === undefined || newUser.lastname === undefined ||
    newUser.client_id === undefined || newUser.client_id === undefined ||
    newUser.firstname === "" || newUser.lastname === "") {
    return false;
  } else {
    return true;
  }
}
