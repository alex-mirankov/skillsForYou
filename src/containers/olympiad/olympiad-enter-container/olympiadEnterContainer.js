import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.scss';

import { history } from '../../../services/redux';
import { OlympicCard, Warning } from '../../../components/index';
import olympicSolo from '../../../images/olympic-solo.png';
import { baseUrl } from '../../../config/api-config';

const warningText = 'Чтобы принять участие в олимпиаде необходимо войти в аккаунт';

export class OlympiadEnterContainerWithRedux extends React.Component {
  state = {
    olympiadStartDate: '',
  };
  Registration = () => (
    <div className="olympic-enter">
      <div className="olympic-enter__header">Чтобы начать свое участие в олимпиаде перейдите в индивидуальный раздел</div>
      <div className="olympic-enter__content">
        <OlympicCard
          header={'Индивидуальная олимпиада'}
          image={olympicSolo}
          // olympiadStartDate={this.state.olympiadStartDate}
          content={'Любишь сражаться в одиночку?! Тогда прими участие'}
          action={this.goToSoloOlymp}
        />
      </div>
    </div>
  );

  componentDidMount() {
    let params = {
      headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
    };
    axios.get(`${baseUrl}/olympiad`, params)
      .then(data => {
        let arrayWithDates = [];
        console.log(data.data);
        let filteredArray = data.data.filter(element => new Date(element.start_olympiad.split('T')[0]) >= new Date(new Date().toLocaleDateString()));
        console.log(filteredArray);
        filteredArray.forEach(element => {
          arrayWithDates.push(new Date(element.start_olympiad));
        });

        let min = arrayWithDates[0];
        let max;
        arrayWithDates.forEach((element, i) => {
          if (arrayWithDates[i] > max) max = arrayWithDates[i];
          if (arrayWithDates[i] < min) min = arrayWithDates[i];
        });
        this.setState({
          olympiadStartDate: min.toLocaleDateString(),
        })
      })
      .catch(e => console.log(e));
  }

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
