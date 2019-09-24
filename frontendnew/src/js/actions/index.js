import { alertConstants, userConstants } from "../constants/action-types";

export function success(message) {
  console.log("dispatching the action");
  return { type: alertConstants.SUCCESS, message };
}
export function error(message) {
  return { type: alertConstants.ERROR, message };
}