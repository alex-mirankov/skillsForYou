import actionTypes from './constants-psycoModule';
export const setVariantsCount = (count) => ({
    type: actionTypes.SET_VARIANTS_COUNT,
    payload: count
})