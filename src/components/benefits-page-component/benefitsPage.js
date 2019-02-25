import React, { Component } from "react";
import "./style.css";
import planLogo from "../../images/plan.png";
import forum from "../../images/forum.png";
import world from "../../images/world.png";
import grow from "../../images/grow.png";

// import
export class Benefits extends Component {
  Benefits = () => (
    <div className="page page_margin">
      <div className="advantages advantages__flex">
        <ul className="list-advantages list-advantages__flex list-advantages_margin list-advantages_font">
          <li className="list-advantages__item">
            <img
              className="list-advantages__image"
              src={grow}
              alt="Картинка кубок"
            />
            <p className="list-advantages__text">
              Рост от новчика
              <br /> до профессионала
            </p>
          </li>
          <li className="list-advantages__item">
            <img
              className="list-advantages__image"
              src={world}
              alt="Картинка планета"
            />
            <p className="list-advantages__text">
              Доступ из любой
              <br /> точки мира
            </p>
          </li>
          <li className="list-advantages__item">
            <img
              className="list-advantages__image"
              src={forum}
              alt="Картинка сообщество"
            />
            <p className="list-advantages__text">Форум для обсуждений</p>
          </li>
          <li className="list-advantages__item">
            <img
              className="list-advantages__image"
              src={planLogo}
              alt="Картинка книга"
            />
            <p className="list-advantages__text">Составленный учебный план</p>
          </li>
        </ul>
      </div>
    </div>
  );

  render() {
    return <this.Benefits />;
  }
}
