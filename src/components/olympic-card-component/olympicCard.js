import React from 'react';
import './style.css';

import ButtonAll from '../../components/share/button-all/buttonAll';

class OlympicCard extends React.Component {
    render() {
        let { header, image, content, date } = this.props;
        return (
            <div className="olympic-card">
                <p className="olympic-card-header">{header}</p>
                <div className="olympic-card-content">
                    <div>
                        <img className="olympic-image" src='../../images/olympic-solo.png' alt="Фото" />
                    </div>
                    <div>
                        <p className="olympic-text">{content} <span className="olympic-span">прямо сейчас!</span></p>
                        <p className="olympic-date">Ближайшая олимпиада: {date}</p>
                        <ButtonAll
                            content={'Участвовать'}
                        />
                    </div>
                </div>
                <p className="olympic-timetable">Расписание олимпиад</p>
            </div>
        );
    }
}

export default OlympicCard;
