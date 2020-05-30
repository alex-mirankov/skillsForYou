import React from 'react';

import './style.scss';

import { ButtonAll } from '../../index';

export class OlympicCard extends React.Component {
	render() {
		let { header, image, content, action, styles, olympiadStartDate } = this.props;
		return (
			<div className="olympic-card">
				<div className="olympic-card__header">{header}</div>
				<div className="olympic-card-content">
					<div className="olympic-card__img-container">
						<img className="olympic-card-content__image" src={image} alt="Фото" style={styles} />
					</div>
					<div className="olympic-card-content-info">
						<p className="olympic-card-content-info__text">{content}
							<span className="olympic-card-content-info__text-span"> прямо сейчас!</span>
						</p>
						{/* <p className="olympic-card-content-info__date">Ближайшая олимпиада: {olympiadStartDate ? olympiadStartDate : 'нет созданных олимпиад'}</p> */}
						<ButtonAll content={'Участвовать'} action={action} />
					</div>
				</div>
			</div>
		);
	}
}
