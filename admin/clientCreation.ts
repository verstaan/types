import { NewClient } from "./newClient";
import { NewUser } from "../newUser";

export interface ClientCreation {
  client: NewClient;
  user: NewUser;
  invite: boolean;
}
