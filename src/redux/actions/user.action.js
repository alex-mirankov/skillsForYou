import { GET_USER_TOKEN, DELETE_USER_TOKEN } from './constants';

export const getUserToken = (token) => {
    return {
        type: GET_USER_TOKEN,
        payload: token,
    }
}

export const deleteUserToken = () => {
    return {
        type: DELETE_USER_TOKEN,
    }
}
