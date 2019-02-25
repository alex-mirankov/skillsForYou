import React, { Component } from "react";
import "./style.css";
import teacherImg from "../../images/cards-tacher-img.png";
import studentCupImg from "../../images/studentCup.png";

export class HomeWork extends Component {
  HomeWorkLayout = () => (
    <div className="home-work home-work__size home-work_beauty home-work_position">
      <div className="home-work__header">
        <img
          className="home-work__image"
          src={studentCupImg}
          alt="student Cup"
        />
        <p className="home-work__p">Домашнее задание</p>
        <button className="home-work__link">Файлы для скачивания</button>
      </div>
      <div className="home-work__description">
        <p className="home-work__main-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Sed ut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
          quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
          eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem.
        </p>
      </div>
      <div className="home-work__info">
        <img className="home-work__image-info" src={teacherImg} alt="teacher" />
        <p className="home-work__text-info">
          <span className="home-work__text-info_light">Преподаватель:</span>
          Узянова Юлия
        </p>
        <button className="home-work__link home-work__link_info">
          Кто проверяет ДЗ?
        </button>
      </div>
    </div>
  );
  render() {
    return <this.HomeWorkLayout />;
  }
}
