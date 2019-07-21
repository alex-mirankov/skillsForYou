import React from "react";
import './style.scss';

import Carousel from "nuka-carousel";
import { ButtonAll } from '../index';

import sliderGuyImg from "../../images/image-slider__guy.png";
import sliderGuyImg2 from "../../images/kartinka_2.png";
import sliderGuyImg3 from "../../images/kartinka_3.png";
import mechanic_header_1 from "../../images/mechanic-header_1.png";
import mechanic_header_2 from "../../images/mechanic_header_2.png";

export const sliderData = [
  {
    text:
      "Ты давно хотел попасть в сферу IT технологий, но не хваталосмелости и навыка?!",
    img: sliderGuyImg
  },
  {
    text:
      "Ты давно хотел попасть в сферу IT технологий, но не хваталосмелости и навыка?!",
    img: sliderGuyImg2
  },
  {
    text:
      "Ты давно хотел попасть в сферу IT технологий, но не хваталосмелости и навыка?!",
    img: sliderGuyImg3
  }
];

export class Slider extends React.Component {
  RenderLayout = props => {
    const { item } = props;
    const renderArray = (
      <div className="slider">
        <div className="slider-container">
          <div className="slider-container__slide">
            <div className="slider-container__slide-info">
              <p className="slider-container__slide-info-header">Skills for you</p>
              <p className="slider-container__slide-info-description">
                шаг навстречу успеху
              </p>
              <p className="slider-container__slide-info-text">
                {item.text}
                <br />
                Skills for you поможет тебе, ведь именно здесь ты можешь
                прокачать свой уровень и пройти путь от новчика до
                профессионала.
                </p>
              <ButtonAll content={'Что дальше'} />
            </div>
            <img
              src={item.img}
              className="slider-container__slide-image"
              alt="slider img"
            />
          </div>
        </div>
      </div>
    );
    return renderArray;
  };

  render() {
    const items = sliderData.map((item, index) => {
      return <this.RenderLayout item={sliderData[index]} key={item.text} />;
    });

    return (
      <Carousel
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
      >
        {items}
      </Carousel>
    );
  }
}
