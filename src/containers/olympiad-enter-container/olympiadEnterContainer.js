import React from 'react';
import './style.css';
import OlympicCard from '../../components/olympic-card-component/olympicCard';
import { history } from '../../services/redux';

import olympicSolo from '../../images/olympic-solo.png';
import olympicTeam from '../../images/olympic-team.png';

class OlympiadEnterContainer extends React.Component {
    goToSoloOlymp = () => {
        history.push('/olympic-registration');
    }
    goToTeamOlymp = () => {
        history.push('/olympic-registartion-team');
    }
    render() {
        return (
            <div className="page-olympic">
                <p className="olympic-header">Чтобы начать свое участие в олимпиаде выбери нужный раздел</p>
                <div className="cards-olympic">
                    <OlympicCard
                        header={'Командная олимпиада'}
                        image={olympicTeam}
                        content={'Создай свою команду и начни участвовать'}
                        date={'22.01.2019'}
                        action={this.goToSoloOlymp}
                    />
                    <OlympicCard
                        header={'Индивидуальная олимпиада'}
                        image={olympicSolo}
                        content={'Любишь сражаться в одиночку?!Тогда прими участие'}
                        date={'22.01.2019'}
                        action={this.goToTeamOlymp}
                    />
                </div>
            </div>
        );
    }
}

export default OlympiadEnterContainer;