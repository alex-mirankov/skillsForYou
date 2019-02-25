import React from 'react';
import './style.css';
import OlympicCard from '../../components/olympic-card-component/olympicCard';

class OlympiadEnterContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-olympic">
                <p className="olympic-header">Чтобы начать свое участие в олимпиаде выбери нужный раздел</p>
                <div className="cards-olympic">
                    <OlympicCard
                        header={'Командная олимпиада'}
                        image={'../../images/olympicTeam.png'}
                        content={'Создай свою команду и начни участвовать'}
                        date={'22.01.2019'}
                    />
                    <OlympicCard
                        header={'Индивидуальная олимпиада'}
                        image={'../../images/olympicSolo.png'}
                        content={'Любишь сражаться в одиночку?!Тогда прими участие'}
                        date={'22.01.2019'}
                    />
                </div>
            </div>
        );
    }
}

export default OlympiadEnterContainer;