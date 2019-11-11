import actionTypes from './constants-psycoModule';
export const setTests = (tests) => ({
    type: actionTypes.SET_TESTS,
    payload: tests
})