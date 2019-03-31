import { GET_COURSES } from './index';

export const getCourses = (data) => {
    return {
        type: GET_COURSES,
        payload: data,
    }
}
