import actionTypes from './constants-psycoModule';
export const setGroupObject = (groupObject) => ({
    type: actionTypes.SET_GROUP_OBJECT,
    payload: groupObject
})