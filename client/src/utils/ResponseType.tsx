import { ErrorInterface } from "../interfaces/ErrorInterface";
import { UserResponseData } from "../interfaces/UserInterface";

export function isUserResponseData(response: UserResponseData | ErrorInterface): response is UserResponseData {
  return (response as UserResponseData).data !== undefined;
}