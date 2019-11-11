import actionTypes from './constants-psycoModule';
export const changeTestType = (testType) => ({
    type: actionTypes.SET_TEST_TYPE,
    payload: testType
})