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
        ...state,
        numericOlympiad: action.payload,
      }
    case SET_CURRENT_OLYMPIAD_TASK:
      return {
        ...state,
        currentOlympiad: {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          input_data: action.payload.input_data,
          output_data: action.payload.output_data,
          memory_limit: action.payload.memory_limit,
          time_limit: action.payload.time_limit,
          examples: action.payload.examples,
          input_type: action.payload.input_type,
        }
      }
    default:
      return state;
  }
}
