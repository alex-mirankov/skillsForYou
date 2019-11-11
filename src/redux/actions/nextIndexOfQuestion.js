import actionTypes from './constants-psycoModule';
export const setIndexOfQuestion = (index) => ({
    type: actionTypes.SET_QUESTION_INDEX,
    payload: index
})