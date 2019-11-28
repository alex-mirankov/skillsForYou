import { GET_USER_TOKEN, DELETE_USER_TOKEN, SET_USER_INFO } from './index';

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

export const setUserInfo = (user) => {
	return {
		type: 'SET_USER_INFO',
		payload: user
	}
}
