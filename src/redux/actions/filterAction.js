import actionTypes from './constants-psycoModule';
export const setFilter = filter => ({
    type: actionTypes.SET_FILTER,
    payload: filter
});

export const setSearchQuery = query => ({
    type: actionTypes.SET_QUERY,
    payload: query
});