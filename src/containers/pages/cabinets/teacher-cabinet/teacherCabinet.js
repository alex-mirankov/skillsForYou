import React from 'react';
import './style.scss';

import {
  UserInfo,
  InputCabinet,
  TextareaCabinet,
  SelectCabinet,
  LessonCardComponent,
  StepComponent,
} from '../common/index';

import {
  ButtonAll,
} from '../../../../components/index';
import { history } from '../../../../services/redux';

const gradient = 'linear-gradient(to top, #4f2f82 0%, #5f3789 10%, #714091 21%, #714091 31%, #714091 40%, #543184 78%, #371e48 100%)';

export class TeacherCabinet extends React.Component {
  state = {
    category: '',
    level: '',
  }

  handleChangeCategory = (name) => {
    this.setState({
      category: name,
    });
  };

  handleChangeLevel = (name) => {
    this.setState({
      level: name,
    });
  };

  goToCreateOlympiad = () => {
    history.push('/create-olympiad');
  }

  render() {
    const level = [
      {
        value: 'junior',
        text: 'Начинающий',
      },
      {
        value: 'middle',
        text: 'Средний',
      },
      {
        value: 'senior',
        text: 'Продвинутый',
      },
    ];
    const category = [
      {
        value: 'programming',
        text: 'Программирование',
      },
      {
        value: 'dataBase',
        text: 'Базы данных',
      },
      {
        value: 'web',
        text: 'Веб разработка',
      },
      {
        value: 'mobile',
        text: 'Мобильная разработка',
      },
      {
        value: 'other',
        text: 'Другое',
      },
    ]
    return (
      <>
        <div className="teacher-cabinet">
          <div className="teacher-cabinet__user">
            <UserInfo
              name={'Тимофей Титов'}
              email={'timofeytitov@gmail.com'}
              title={'Преподаватель'}
              amount_courses={'4'}
              amount_lessons={'4'} />
          </div>
          <div className="teacher-cabinet-control">
            <div className="teacher-cabinet-control__buttons">
              <ButtonAll styles={{ width: '46%', background: gradient }} content={'Список курсов'} />
              <ButtonAll styles={{ width: '46%' }} content={'Новый курс'} />
            </div>
            <ButtonAll content={'Создать олимпиаду'} action={this.goToCreateOlympiad} />
            <div className="teacher-cabinet-control__input">
              <InputCabinet caption={'Заголовок'} />
            </div>
            <div className="teacher-cabinet-control__input">
              <InputCabinet caption={'Подзаголовок'} />
            </div>
            <div className="teacher-cabinet-control__input">
              <TextareaCabinet caption={'Описание курса'} />
            </div>
            <div className="teacher-cabinet-control__input">
              <SelectCabinet inputValues={level}
                              caption={'Уровень'}
                              handleChange={this.handleChangeLevel}
                              currentValue={this.state.level} />
            </div>
            <div className="teacher-cabinet-control__input">
              <SelectCabinet inputValues={category}
                              caption={'Категория'}
                              handleChange={this.handleChangeCategory}
                              currentValue={this.state.category} />
            </div>
            <div className="teacher-cabinet-control__button">
              <ButtonAll content={'Создать курс'}/>
            </div>
            <div className="teacher-cabinet-control__success">
              <div className="teacher-cabinet-control__success-text">
                Ваш курс создан!<br></br>
                Теперь вы можете добавить учебный материал
              </div>
              <div className="teacher-cabinet-control__success-button">
                <ButtonAll styles={{ background: gradient }} content={'Добавить'} />
              </div>
            </div>
            <LessonCardComponent />
            <StepComponent />
          </div>
        </div>
      </>
    );
  }
}