import React from 'react';
import './style.scss';

import { ButtonAll } from '../../index';

export class OlympicCard extends React.Component {
	render() {
		let { header, image, content, date, action, styles } = this.props;
		return (
			<div className="olympic-card">
				<p className="olympic-card__header">{header}</p>
				<div className="olympic-card-content">
					<img className="olympic-card-content__image" src={image} alt="Фото" style={styles} />
					<div className="olympic-card-content-info">
						<p className="olympic-card-content-info__text">{content}
							<span className="olympic-card-content-info__text-span"> прямо сейчас!</span>
						</p>
						<p className="olympic-card-content-info__date">Ближайшая олимпиада: {date}</p>
						<ButtonAll content={'Участвовать'} action={action} />
					</div>
				</div>
				<p className="olympic-card-timetable">
					<a href="/olympiads" className="olympic-card-timetable__link">Расписание олимпиад</a>
				</p>
			</div>
		);
	}
}
