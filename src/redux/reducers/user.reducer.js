import { GET_USER_TOKEN, DELETE_USER_TOKEN, SET_USER_INFO } from '../actions/constants';

const initialState = {
  userToken: '',
  isDisplayControlPanel: false,
  isDisplayRegAndLoginPanel: true,
  id: '',
  email: '',
  full_name: 's',
  avatar: '',
  is_teacher: false
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_TOKEN:
      return {
        userToken: action.payload,
        isDisplayControlPanel: true,
        isDisplayRegAndLoginPanel: false,
        id: state.id,
        email: state.email,
        full_name: state.full_name,
        avatar: state.avatar,
        is_teacher: state.is_teacher
      }
    case DELETE_USER_TOKEN:
      return {
        userToken: '',
        isDisplayControlPanel: false,
        isDisplayRegAndLoginPanel: true,
        email: state.email,
        full_name: state.full_name,
        avatar: state.avatar,
        is_teacher: state.is_teacher
      }
    case SET_USER_INFO:
      return {
        id: action.payload.id,
        email: action.payload.email,
        full_name: action.payload.full_name,
        avatar: action.payload.avatar,
        is_teacher: action.payload.is_teacher,
        userToken: state.userToken,
        isDisplayControlPanel: state.isDisplayControlPanel,
        isDisplayRegAndLoginPanel: state.isDisplayRegAndLoginPanel
      }
    default:
      return state
  }
}
