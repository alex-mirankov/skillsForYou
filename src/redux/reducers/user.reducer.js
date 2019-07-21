import { GET_USER_TOKEN, DELETE_USER_TOKEN } from '../actions/constants';

const initialState = {
    userToken: '',
    isDisplayControlPanel: false,
    isDisplayRegAndLoginPanel: true,
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_TOKEN:
            return {
                userToken: action.payload,
                isDisplayControlPanel: true,
                isDisplayRegAndLoginPanel: false,
            }
        case DELETE_USER_TOKEN:
            return {
                userToken: '',
                isDisplayControlPanel: false,
                isDisplayRegAndLoginPanel: true,
            }
        default:
            return state
    }
}
