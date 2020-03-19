import { handleResponses } from '../_helpers/handleResponse';
import {authHeader} from "../_helpers/authHeader";

export const userService = {
  getAllGroups
};

function getAllGroups() {
  const requestOptions = {method: 'GET', headers: authHeader()}
  return fetch(`/api/groups`, requestOptions).then(handleResponses.handleResponse);
}