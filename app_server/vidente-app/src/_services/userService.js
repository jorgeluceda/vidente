import { handleResponses } from '../_helpers/handleResponse';
import {authHeader} from "../_helpers/authHeader";

export const userService = {
  getAllGroups,
  getLabels,
  createGroup
};

function getAllGroups() {
  const requestOptions = {method: 'GET', headers: authHeader()};
  return fetch(`/api/groups`, requestOptions).then(handleResponses.handleResponse);
}

function getLabels(props) {
  const requestOptions = {method: 'GET', headers: authHeader()};
  return fetch(`/api/labels/?id=${props}`, requestOptions).then(handleResponses.handleResponse);
}

function createGroup(groupName) {
  const requestOptions = { 
    method: 'POST', headers: {...authHeader(), 'Content-Type' : 'application/json'}, 
    body: JSON.stringify({name: groupName})
  };

  return fetch(`/api/groups`, requestOptions).then(handleResponses.handleResponse);
}