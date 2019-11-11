import actionTypes from '../actions/constants-psycoModule';
const initialState = {
    results: [],
};
export default (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_RESULTS:
            return {
                results: action.payload,
            };
        default:
            return state;
    }
}