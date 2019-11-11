import actionTypes from './constants-psycoModule';
export const setPassingTest = (passingTest) => ({
    type: actionTypes.SET_PASSING_TEST,
    payload: passingTest
})