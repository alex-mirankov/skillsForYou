import React from "react";
import { OneComplete } from "./complete_one-component";

export function CompleteTasks({ team, commonTasks }) {
  function renderRow(user) {
    return (
      <OneComplete
        fullName={user.fullName}
        urlImg={user.urlImg}
        tasksCompleted={user.tasksCompleted}
        commonTasks={commonTasks}
      />
    );
  }

  return <div className="section-completed">{team.map(renderRow)}</div>;
}
