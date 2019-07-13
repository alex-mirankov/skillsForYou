import React, { Component } from "react";
import './style.scss';

import planLogo from "../../images/plan.png";
import forum from "../../images/forum.png";
import world from "../../images/world.png";
import grow from "../../images/grow.png";

export const benefitsPoints = [
  {
    image: grow,
    alt: 'Картинка кубок',
    caption: 'Рост от новчика до профессионала',
  },
  {
    image: world,
    alt: 'Картинка планета',
    caption: 'Доступ из любой точки мира',
  },
  {
    image: forum,
    alt: 'Картинка сообщество',
    caption: 'Форум для обсуждений',
  },
  {
    image: planLogo,
    alt: 'Картинка книга',
    caption: 'Составленный учебный план',
  },
];

export class Benefits extends Component {
  Benefits = () => (
    <div className="page page_margin">
      <div className="advantages">
        <ul className="advantages__list">
          {
            benefitsPoints.map(item => {
              return (
                <li className="advantages__list-item">
                  <img
                    className="advantages__list-image"
                    src={item.image}
                    alt={item.alt}
                  />
                  <p className="advantages__list-text">
                    {item.caption}
                  </p>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );

  render() {
    return <this.Benefits />;
  }
}
