import axios from 'axios';

export class CoursesService {
  getAllCourses = () => {
    axios.get('https://skill4u.herokuapp.com/courses')
      .then(res => { console.log(res.data);})
      .catch(error => console.log(error));
  }
}