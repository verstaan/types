export interface NewClient {
  name: string;
  primary_email: string;
  licenses: number;
  containers: string[];
}

/**
 * Checks if we have all the required information to sign up
 *
 * @returns {boolean} True if all the information is present
 *
 */
export function checkNewClientInfo(newClient: NewClient): boolean {
  if (typeof (newClient.name) != "string" ||
    typeof (newClient.primary_email) != "string" ||
    typeof (newClient.licenses) != "number" ||
    newClient.containers instanceof Array ||
    newClient.name === undefined ||
    newClient.primary_email === undefined ||
    newClient.primary_email === "" ||
    newClient.licenses === undefined ||
    newClient.containers === undefined) {
    return false;
  } else {
    return true
  }
}
