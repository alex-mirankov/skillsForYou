import React from "react";
import "./style.css";
import Time from "../timr-block/time.block";

export function PassingOlympiad({
  title,
  classImg,
  allTasks,
  tasksDone,
  hour,
  minutes,
  seconds,
  children
}) {
  return (
    <div className="c-card__c-body c-body">
      <div className="c-content">
        <div className={"img c-content__section c-body__img " + classImg} />
        <div className="c-content__section">
          <p className="c-title c-title_bottom">{title}</p>
          <p className="text text_big text_bold ">
            <span className="text_orange">Всего заданий: </span>
            {allTasks}
          </p>
          <p className="text text_big text_bold">
            <span className="text_orange">Выполнено: </span> {tasksDone}
          </p>
        </div>
        <div className="c-content__section section_small">
          <p className="text_big text_bold text_orange">Осталось времени: </p>
          <section className="c-content">
            <Time time={hour} title="часов" />
            <Time time={minutes} title="минут" />
            <Time time={seconds} title="секунд" />
          </section>
        </div>
      </div>
      <div className="c-section">
       {children}
      </div>
    </div>
  );
}
