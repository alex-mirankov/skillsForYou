import { SET_NUMERIC_SINGLE_OLYMPIAD_TASK, SET_CURRENT_OLYMPIAD_TASK } from './constants';

export const setNumericOlympiad = (id) => {
  return {
    type: SET_NUMERIC_SINGLE_OLYMPIAD_TASK,
    payload: id,
  }
}

export const setCurrentOlympiadTask = ({
  id: id,
  name: name,
  description: description,
  time_limit: time_limit,
  input_data: input_data,
  output_data: output_data,
  memory_limit: memory_limit,
  examples: examples,
  input_type: input_type,
}) => {
  return {
    type: SET_CURRENT_OLYMPIAD_TASK,
    payload: {
      id: id,
      name: name,
      description: description,
      time_limit: time_limit,
      input_data: input_data,
      output_data: output_data,
      memory_limit: memory_limit,
      examples: examples,
      input_type: input_type,
    }
  }
}
