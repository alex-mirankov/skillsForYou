import { GET_COURSES } from '../actions/index';

const initialState = {
    courses: [],
}

const courses = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSES:
            return {
                courses: action.payload,
            }
        default:
            return state
    }
}

export default courses;
