import React from 'react';
import './style.css';

import {
  InputRegistrationForm,
  ShareCheckBox,
} from '../../index';

const styles = {
  marginTop: '43px',
}

export class OlympiadRegistrationConfirm extends React.Component {
  render() {
    return (
      <div className="card-registration">
        <InputRegistrationForm styles={styles} placeHolder={'Имя'} />
        <InputRegistrationForm placeHolder={'Фамилия'} />
        <p className="card-registration-text">Вы хотите принять участие
            в качестве руководителя команды?
                </p>
        <ShareCheckBox
          name={'checkedYes'}
          label={'Да'}
        />
        <ShareCheckBox
          name={'checkedNo'}
          label={'Нет'}
        />
      </div>
    );
  };
}
