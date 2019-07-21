import React from "react";
import '../style.css';

import { CheckTasks } from '../../index';

export function OneComplete({ urlImg, fullName, tasksCompleted, commonTasks }) {
  return (
    <div className="tasks-section">
      <div>
        <img src={urlImg} alt="user" />
      </div>
      <div className="text_bold">{fullName}</div>
      <div className="text_orange text_bold">Выполнил задачи:</div>
      <CheckTasks total={commonTasks} currents={tasksCompleted} />
    </div>
  );
}
