import { handleResponses } from '../_helpers/handleResponse';
import {authHeader} from "../_helpers/authHeader";

export const userService = {
  createGroup,
  getAllGroups,
  deleteGroup,
  getLabels,
  createLabel,
  updateLabel,
  deleteLabel
};

function getAllGroups() {
  const requestOptions = {method: 'GET', headers: authHeader()};
  return fetch(`/api/groups`, requestOptions).then(handleResponses.handleResponse);
}


function createGroup(groupName) {
  const requestOptions = { 
    method: 'POST', headers: {...authHeader(), 'Content-Type' : 'application/json'}, 
    body: JSON.stringify({name: groupName})
  };

  return fetch(`/api/groups`, requestOptions).then(handleResponses.handleResponse);
}

function deleteGroup(groupId) {
  const requestOptions = {
    method: 'DELETE', headers: {...authHeader(), 'Content-Type' : 'application/json'},
    body: JSON.stringify({groupId: groupId})
  };

  return fetch(`/api/groups`, requestOptions).then(handleResponses.handleResponse);
}

function getLabels(props) {
  const requestOptions = {method: 'GET', headers: authHeader()};
  return fetch(`/api/labels/?id=${props}`, requestOptions).then(handleResponses.handleResponse);
}

function createLabel(groupName, groupId, labelName, labelSku, labelType) {
  const requestOptions = {
    method: 'POST', headers: {...authHeader(), 'Content-Type' : 'application/json'},
    body: JSON.stringify({groupName: groupName, groupId: groupId, labelName: labelName,
      labelSku: labelSku, labelType: labelType})
  };

  return fetch(`/api/labels`, requestOptions).then(handleResponses.handleResponse);
}

function updateLabel(groupId, labelId, labelName, labelSku, labelType) {
  const requestOptions = {
    method: 'PUT', headers: {...authHeader(), 'Content-Type' : 'application/json'},
    body: JSON.stringify({groupId: groupId, labelId: labelId, labelName: labelName,
      labelSku: labelSku, labelType: labelType})
  };

  return fetch(`/api/labels`, requestOptions).then(handleResponses.handleResponse);
}

function deleteLabel(groupId, labelId) {
  const requestOptions = {
    method: 'DELETE', headers: {...authHeader(), 'Content-Type' : 'application/json'},
    body: JSON.stringify({groupId: groupId, labelId: labelId})
  };

  return fetch(`/api/labels`, requestOptions).then(handleResponses.handleResponse);
}