import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

import { history } from '../../../services/redux';
import { OlympicCard, Warning } from '../../../components/index';
import olympicSolo from '../../../images/olympic-solo.png';

const warningText = 'Чтобы принять участие в олимпиаде необходимо войти в аккаунт';

export class OlympiadEnterContainerWithRedux extends React.Component {
  Registration = () => (
    <div className="olympic-enter">
      <div className="olympic-enter__header">Чтобы начать свое участие в олимпиаде выбери нужный раздел</div>
      <div className="olympic-enter__content">
        <OlympicCard
          header={'Индивидуальная олимпиада'}
          image={olympicSolo}
          content={'Любишь сражаться в одиночку?!Тогда прими участие'}
          date={'22.01.2019'}
          action={this.goToSoloOlymp}
        />
      </div>
    </div>
  );

  goToSoloOlymp = () => {
    history.push('/olympic-registration');
  }

  render() {
    return (
      <>
        {
          window.localStorage.getItem('token')
          ? <this.Registration />
          : <Warning warningText={warningText} />
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userToken,
});

export const OlympiadEnterContainer = connect(mapStateToProps)(OlympiadEnterContainerWithRedux);
