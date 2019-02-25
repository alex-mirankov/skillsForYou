import { take, takeEvery, call, put, race } from "redux-saga/effects";
import { delay } from "redux-saga";
import jwt from "jwt-decode";
import { push } from "react-router-redux";

import appConfig from "../config/env";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from "../redux/constants/loginConstants";
import {
  logoutClient,
  loginError,
  resumeListLogout,
  resumeLogout
} from "../actions";
import { loginApiRequest } from "../utils";

import { profileDataRequestClearStore } from "../actions/userProfileRequestActions";
import { profileDataUpdateLogout } from "../actions/userProfileUpdateActions";
import { getProfilesLogout } from "../actions/getProfilesActions";

const setTokenToLocalStorage = token => {
  localStorage.setItem(appConfig.tokenKey, token);
};

function* authorize(userEmail, password) {
  const { response } = yield race({
    response: call(loginApiRequest, userEmail, password),
    signOut: take(LOGOUT)
  });

  const { token } = response.data;

  if (response && token) {
    yield call(setTokenToLocalStorage, token);

    const decodedToken = jwt(token);
    const {
      departmentId,
      email,
      firstName,
      lastName,
      position,
      group,
      profileId,
      img,
      skype,
      phone,
      room
    } = decodedToken;
    yield put({
      type: LOGIN_SUCCESS,
      departmentId,
      email,
      firstName,
      lastName,
      position,
      group,
      profileId,
      img,
      skype,
      phone,
      room
    });

    yield put(push(`/employee/${email}`));

    return response.data.token;
  }
  yield call(logout);
  return null;
}

function* getToken(action) {
  let result;
  try {
    const token = yield call(
      authorize,
      action.payload.email,
      action.payload.password
    );
    result = token;
  } catch (err) {
    yield put(loginError(err));
    result = null;
  }
  return result;
}

export function* authFlow() {
  const token = yield takeEvery(LOGIN_REQUEST, getToken);

  let userSignedOut = false;

  if (token === null) {
    userSignedOut = true;
  }

  while (!userSignedOut) {
    const { ttl } = appConfig;

    const { expired, signOut } = yield race({
      expired: delay(ttl),
      signOut: take(LOGOUT)
    });

    if (signOut) {
      userSignedOut = true;
    } else if (expired) {
      yield call(logout);
    }
  }
}

export function* logoutWatcher() {
  while (true) {
    yield take(LOGOUT);
    yield call(logout);
  }
}

function* logout() {
  localStorage.removeItem(appConfig.tokenKey);
  yield put(push("/"));
  yield put(profileDataRequestClearStore());
  yield put(profileDataUpdateLogout());
  yield put(getProfilesLogout());
  yield put(resumeListLogout());
  yield put(resumeLogout());
  yield put(logoutClient());
}
