import { GET_COURSES, GET_COURSES_WITH_SEARCH } from './constants';

export const getCourses = (data) => {
    return {
        type: GET_COURSES,
        payload: data,
    }
}

export const getCoursesWithSearch = (data) => {
    return {
        type: GET_COURSES_WITH_SEARCH,
        payload: data,
    }
}
