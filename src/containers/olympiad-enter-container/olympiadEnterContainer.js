import React from 'react';
import './style.css';
import OlympicCard from '../../components/olympic-card-component/olympicCard';

import olympicSolo from '../../images/olympic-solo.png';
import olympicTeam from '../../images/olympic-team.png';

class OlympiadEnterContainer extends React.Component {
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
                    />
                    <OlympicCard
                        header={'Индивидуальная олимпиада'}
                        image={olympicSolo}
                        content={'Любишь сражаться в одиночку?!Тогда прими участие'}
                        date={'22.01.2019'}
                    />
                </div>
            </div>
        );
    }
}

export default OlympiadEnterContainer;