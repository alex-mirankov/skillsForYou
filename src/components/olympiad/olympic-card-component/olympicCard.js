import React from 'react';
import './style.css';

import { ButtonAll } from '../../index';

export class OlympicCard extends React.Component {
    render() {
        let { header, image, content, date, action, styles } = this.props;
        return (
            <div className="olympic-card">
                <p className="olympic-card-header">{header}</p>
                <div className="olympic-card-content">
                    <img className="olympic-image" src={image} alt="Фото" style={styles} />
                    <div className="olympic-card-info">
                        <p className="olympic-text">{content} <span className="olympic-span">прямо сейчас!</span></p>
                        <p className="olympic-date">Ближайшая олимпиада: {date}</p>
                        <ButtonAll
                            content={'Участвовать'}
                            action={action}
                        />
                    </div>
                </div>
                <p className="olympic-timetable">
                    <a href="/olympiads" className="olympic-timetable-link">Расписание олимпиад</a>
                </p>
            </div>
        );
    }
}
