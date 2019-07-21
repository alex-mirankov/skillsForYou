import { GET_COURSES, GET_COURSES_WITH_SEARCH } from '../actions/constants';

const initialState = {
    courses: [],
}

export const courses = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSES:
            return {
                courses: action.payload,
            }
        case GET_COURSES_WITH_SEARCH:
            return {
                courses: action.payload,
            }
        default:
            return state
    }
}
