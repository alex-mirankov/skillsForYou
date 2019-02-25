import React from "react";
import Carousel from "nuka-carousel";
import sliderGuyImg from "../../images/image-slider__guy.png";
import sliderGuyImg2 from "../../images/kartinka_2.png";
import sliderGuyImg3 from "../../images/kartinka_3.png";
import mechanic_header_1 from "../../images/mechanic-header_1.png";
import mechanic_header_2 from "../../images/mechanic_header_2.png";

import "./style.css";

const sliderData = [
  {
    text:
      "Ты давно хотел попасть в сферу IT технологий, но не хваталосмелости и навыка?!",
    img: sliderGuyImg
  },
  {
    text:
      "2222222Ты давно хотел попасть в сферу IT технологий, но не хваталосмелости и навыка?!",
    img: sliderGuyImg2
  },
  {
    text:
      "333333333Ты давно хотел попасть в сферу IT технологий, но не хваталосмелости и навыка?!",
    img: sliderGuyImg3
  }
];

export class Slider extends React.Component {
  RenderLayout = props => {
    const { item } = props;
    const renderArray = (
      <div className="wrapperSlider">
      <div className="mechanic-item1">
          <img
             src={mechanic_header_1}
             className="mechanic-item1__image"
             alt="mechanic-item1"
             />
        </div>
        <div className="slider">
          <center>
            <div className="slider__flex slider__size slider_back-styles slider_position">
              <div className="description-slider description-slider__size description-slider_margin">
                <p className="description-slider__header">Skills for you</p>
                <p className="description-slider__content">
                  шаг навстречу успеху
                </p>
                <p className="description-slider__main">
                  {item.text}
                  <br />
                  Skills for you поможет тебе, ведь именно здесь ты можешь
                  прокачать свой уровень и пройти путь от новчика до
                  профессионала.
                </p>
                <button className="description-slider__button description-slider__button_hover">
                  Что дальше?
                </button>
              </div>
              <img
                src={item.img}
                className="image-slider image-slider__size image-slider_margin image-slider__beauty"
                alt="slider img"
              />
              {/* <div className="image-slider image-slider__size image-slider_margin image-slider_back-styles" /> */}
            </div>
          </center>
        </div>
        <div className="mechanic-item2">
          <img
             src={mechanic_header_2}
             className="mechanic-item2__image"
             alt="mechanic-item2"
             />
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
