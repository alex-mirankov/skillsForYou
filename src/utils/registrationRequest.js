import axios from "axios";
import { appConfig } from "../config/env";

export async function registrationRequest(data) {
  const url = `${appConfig.oauthHost}/auth/users/create/student/`;
  let apiRequestError = false;
  let apiRequestSuccess = false;

  let errorInReq = false;

  await axios
    .post(url, { ...data })
    .then(data => {
      errorInReq = false;

      apiRequestSuccess = data;
    })
    .catch(err => {
      errorInReq = true;
      apiRequestError = err;
    });

  if (!errorInReq && apiRequestSuccess && apiRequestSuccess.data) {
    return { data: apiRequestSuccess.data, error: false };
  } else if (
    errorInReq &&
    apiRequestError &&
    apiRequestError.response &&
    apiRequestError.response.request &&
    apiRequestError.response.request.responseText
  ) {
    const data = JSON.parse(apiRequestError.response.request.responseText);
    return { data, error: true };
  }
}
