import React from 'react';
import './style.scss';
import { OlympicCard } from '../../../components/olympiad/index';
import { history } from '../../../services/redux';

import olympicSolo from '../../../images/olympic-solo.png';
import olympicTeam from '../../../images/olympic-team.png';

const styles = {
  marginRight: '50px',
}

export class OlympiadEnterContainer extends React.Component {
  goToSoloOlymp = () => {
    history.push('/olympic-registration');
  }
  goToTeamOlymp = () => {
    history.push('/olympic-registartion-team');
  }
  render() {
    return (
      <>
        <p className="olympic-header">Чтобы начать свое участие в олимпиаде выбери нужный раздел</p>
        <div className="olympic-content">
          <OlympicCard
            header={'Командная олимпиада'}
            image={olympicTeam}
            content={'Создай свою команду и начни участвовать'}
            date={'22.01.2019'}
            action={this.goToTeamOlymp}
            styles={styles}
          />
          <OlympicCard
            header={'Индивидуальная олимпиада'}
            image={olympicSolo}
            content={'Любишь сражаться в одиночку?!Тогда прими участие'}
            date={'22.01.2019'}
            action={this.goToSoloOlymp}
          />
        </div>
      </>
    );
  }
}
