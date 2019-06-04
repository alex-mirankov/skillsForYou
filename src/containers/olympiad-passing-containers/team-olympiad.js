import React from "react";
import { Card, PassingOlympiad } from "../../components/common";
import { TaskOlympiad } from "../../components/task-component";
import { CompleteTasks } from "../../components/task-component/complete-task-team";
import { Pagination } from "../../components/common/pager";
import { ChatContainer } from "../../components/chat-participants";

const team = [
  {
    fullName: "Ваня Ломакин",
    tasksCompleted: [1, 6, 8],
    urlImg: "../../images/header_avatar2.png"
  },
  {
    fullName: "Петр Лапатинский",
    tasksCompleted: [3, 5, 9],
    urlImg: "../../images/header_avatar2.png"
  }
];

const messages = [
  {
    name: "Yvonne",
    date: "Sep 01 2018 17:01:57",
    urlImg: "../../../images/header_avatar2.png",
    message: "Fuga rerum molestias. Consectetur eaque sunt. At autem fugit perferendis consequatur quis. Recusandae accusamus fugiat sunt quo et dolorum doloremque nam voluptates."
  },
  {
    name: "Ruth",
    date: "Jan 03 2019 05:12:22",
    urlImg: "../../../images/header_avatar2.png",
    message: "Dolore vero consequuntur vel et."
  },
  {
    name: "Yvonne",
    date: "Sep 01 2018 17:01:57",
    urlImg: "../../../images/header_avatar2.png",
    message: "Fuga rerum molestias. Consectetur eaque sunt. At autem fugit perferendis consequatur quis. Recusandae accusamus fugiat sunt quo et dolorum doloremque nam voluptates."
  },
  {
    name: "Ruth",
    date: "Jan 03 2019 05:12:22",
    urlImg: "../../../images/header_avatar2.png",
    message: "Dolore vero consequuntur vel et."
  }
]

const Team ={
  owner: {
    fullName: "Ruth",
    urlImg: "../../../images/header_avatar2.png",
  },
  participants:team
}

export function OlympiadTeam() {
  return (
    <main className="main main_top">
      <div className="card-page page_margin">
        <Card cardSize="c-card_big">
          <PassingOlympiad
            title="Индвидуальная олимпиада"
            classImg="img_olympic-team img_big"
            allTasks="15"
            tasksDone="5"
            hour="1"
            minutes="45"
            seconds="35"
            team={Team}
          >
            <div className="olympiad-content main__olympiad-content">
              <div>
                <TaskOlympiad
                  number="3"
                  title="Задача. Как Алик пытался стать фронтером"
                  description="Dolor sit ut fugit ea. Minima ipsum sapiente. Voluptatem laudantium et. Id voluptate consequuntur et.
                  Dolores adipisci totam nesciunt deleniti veritatis qui fugiat. Odit pariatur explicabo. Sit ea minus pariatur. 
  Maiores magnam cupiditate aliquid voluptas consectetur veniam corporis. Voluptatum ducimus autem cum in qui accusamus velit dicta. 
  Ducimus occaecati ullam reprehenderit omnis fugiat. Alias magni impedit est ea non optio.
  Est enim at labore eum iusto. Quidem non veritatis eum. Dolor dolor dolorum dicta quidem culpa culpa quasi repellendus.
  Qui illum nihil architecto error dolorum totam. Soluta quam dolorum. Et perferendis architecto voluptatem illo qui."
                >
                  <>
                   
                    <Pagination page={3} pages={15} />
                  </>
                </TaskOlympiad>
              </div>
              <ChatContainer messages={messages}/>
            </div>
            <CompleteTasks commonTasks={15} team={team} />
          </PassingOlympiad>
        </Card>
      </div>
    </main>
  );
}
