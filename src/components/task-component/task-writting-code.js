import React from "react";
import AceEditor from "react-ace";
import brace from 'brace';
import "./style.css";
import 'brace/mode/javascript';
import 'brace/theme/monokai';

export function TaskWritting() {
  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
    <main className="task">
      <div className="task-section">
        <AceEditor
          mode="javascript"
          theme="monokai"
          style={{
            height: "400px",
            width: "600px",
            fontSize: "18px"
          }}
          onChange={onChange}
          editorProps={{ $blockScrolling: true }}
        />
        {/* <input type='text' className="task-input"/> */}
      </div>
      <section className="tast-buttons task__tast-buttons">
        <button className="send-btn task__send-btn">Назад</button>
        <button className="send-btn task__send-btn">Следующее</button>
        <button className="send-btn task__send-btn">Готово</button>
      </section>
    </main>
  );
}
