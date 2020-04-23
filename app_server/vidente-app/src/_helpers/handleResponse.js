import { authService } from '../_services/authService';

export const handleResponses = {
  handleResponse
};

function handleResponse(response) {
  if(response.status === 500) {
    return ["Internal Server Error"];
  }

  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authService.logout();
        // force reload
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });

}