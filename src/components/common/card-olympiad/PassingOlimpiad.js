import React from "react";
import "./style.css";
import Time from "../timr-block/time.block";
import img from "../../../images/header_avatar2.png"
export function PassingOlympiad({
  title,
  classImg,
  allTasks,
  tasksDone,
  hour,
  minutes,
  seconds,
  children,
  team
}) {
  return (
    <div className="c-card__c-body c-body">
      <div className="c-content">
        <div className={"img c-content__section c-body__img " + classImg} />
        <div className="c-content__section">
          <p className="c-title c-title_bottom">{title}</p>
          <p className="text c-text_big text_bold ">
            <span className="text_orange">Всего заданий: </span>
            {allTasks}
          </p>
          <p className="text c-text_big text_bold">
            <span className="text_orange">Выполнено: </span> {tasksDone}
          </p>
          {team && (
            <div className="c-content__section">
              <div className="c-content">
                <span className="text c-text_big text_bold  text_orange">
                  Участники:{" "}
                </span>
                {team.participants.map(user => (
                  <div className="c-team">
                    <img src={img} alt="" className="img img_message header-msg__img_message"/>
                    <p className="text_bold text_big"> {user.fullName}</p>
                  </div>
                ))}
              </div>
              <div className="c-content">
                <span className="text c-text_big text_bold  text_orange">
                  Командир команды:{" "}
                </span>
                <div  className="c-team ">
                <img src={img} alt="" className="img img_message header-msg__img_message"/>
                  <p className="text_bold text_big"> {team.owner.fullName}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="c-content__section section_small">
          <p className="c-text_big text_bold text_orange">Осталось времени: </p>
          <section className="c-content">
            <Time time={hour} title="часов" />
            <Time time={minutes} title="минут" />
            <Time time={seconds} title="секунд" />
          </section>
        </div>
      </div>
      <div className="c-section">{children}</div>
    </div>
  );
}
