import { SET_NUMERIC_SINGLE_OLYMPIAD_TASK, SET_CURRENT_OLYMPIAD_TASK } from '../actions/constants';

const initialState = {
  numericOlympiad: 1,
  currentOlympiad: {
    id: 0,
    name: '',
    description: '',
  }
}

export const singleOlympiad = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMERIC_SINGLE_OLYMPIAD_TASK:
      return {
        numericOlympiad: action.payload,
      }
    case SET_CURRENT_OLYMPIAD_TASK:
      return {
        ...state,
        currentOlympiad: {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
        }
      }
    default:
      return state;
  }
}
