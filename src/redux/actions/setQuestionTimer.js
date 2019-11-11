import actionTypes from './constants-psycoModule';
export const setQuestionTimer = (timer) => ({
    type: actionTypes.SET_TIMER,
    payload: timer,
    
});