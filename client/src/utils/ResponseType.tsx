import { ErrorInterface } from "../interfaces/ErrorInterface";
import { UserResponseInterface } from "../interfaces/UserInterface";

export function isUserResponseInterface(response: UserResponseInterface | ErrorInterface): response is UserResponseInterface {
  return (response as UserResponseInterface).data !== undefined;
}