import actionTypes from './constants-psycoModule';
export const saveVariantState = (variant) => ({
    type: actionTypes.SAVE_VARIANT_STATE,
    payload: variant
})