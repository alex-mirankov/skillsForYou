import React from "react";
import { Card, PassingOlympiad } from "../../components/common";
import { TaskOlympiad } from "../../components/task-component";
import { Pagination } from "../../components/common/pager";

export function OlympiadSingle() {
  return (
    <main className="main main_top">
      <div className=" card-page page_margin">
        <Card cardSize="c-card_big">
          <PassingOlympiad
            title="Командная олимпиада"
            classImg="img_olympic-solo img_big"
            allTasks="45"
            tasksDone="0"
            hour="2"
            minutes="15"
            seconds="25"
          >
            <div className="main__olympiad-content">
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
                <Pagination page={1} pages={9} />
              </TaskOlympiad>
            </div>
          </PassingOlympiad>
        </Card>
      </div>
    </main>
  );
}
