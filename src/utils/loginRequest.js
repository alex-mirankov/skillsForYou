import axios from "axios";
import { appConfig } from "../config/env";

export async function loginRequest(email, password) {
  const url = `${appConfig.oauthHost}/auth/jwt/create/`;
  let apiRequestSuccess = false;

  await axios
    .post(url, { email, password })
    .then(data => {
      apiRequestSuccess = data;
      localStorage.setItem("auth-token", data.data.token);
    })
    .catch(err => {
      console.log(err);
    });

  return apiRequestSuccess;
}
