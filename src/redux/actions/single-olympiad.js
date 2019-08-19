import { SET_NUMERIC_SINGLE_OLYMPIAD_TASK, SET_CURRENT_OLYMPIAD_TASK } from './constants';

export const setNumericOlympiad = (id) => {
  return {
    type: SET_NUMERIC_SINGLE_OLYMPIAD_TASK,
    payload: id,
  }
}

export const setCurrentOlympiadTask = ({ id: id, name: name, description: description }) => {
  return {
    type: SET_CURRENT_OLYMPIAD_TASK,
    payload: { id: id, name: name, description: description }
  }
}
