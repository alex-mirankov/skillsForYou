import React from 'react';
import './style.scss';

import { history } from '../../../services/redux';
import { connect } from 'react-redux';

import {
  OlympicCard,
  Warning,
} from '../../../components/index';

import olympicSolo from '../../../images/olympic-solo.png';
import olympicTeam from '../../../images/olympic-team.png';

const styles = {
  marginRight: '50px',
}

const warningText = 'Чтобы принять участи в олимпиаде необходимо войти в аккаунт';

export class OlympiadEnterContainerWithRedux extends React.Component {
  Registration = () => (
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
  goToSoloOlymp = () => {
    history.push('/olympic-registration');
  }
  goToTeamOlymp = () => {
    history.push('/olympic-registartion-team');
  }
  render() {
    return (
      <>
        {this.props.user ? <this.Registration /> : <Warning warningText={warningText} />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const OlympiadEnterContainer = connect(mapStateToProps)(OlympiadEnterContainerWithRedux);
