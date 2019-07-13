import React from "react";
import { TaskWritting } from './task-writting-code';

export function TaskOlympiad({ number, title, description, children }) {
  return (
    <>
      <div className="c-content c-content_margin">
        <p className="circle-number">{number}</p>
        <p className="c-title text_bold c-content_text">{title}</p>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <section className="section">
        <TaskWritting />
        {children}
      </section>
    </>
  );
}