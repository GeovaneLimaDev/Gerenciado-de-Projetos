import { useDroppable } from "@dnd-kit/core";
import Task from "../task/task";
import style from "./column.module.css"

function Column({ id, title, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const arrayDecreasing = tasks.sort((a, b) => b.priority - a.priority)
  return (
    
    <div
      ref={setNodeRef}
      className={`${style.board} ${isOver ? style.highlight : ""}`}>
      <p>{title}</p>
      <div className={style.carrossel}>
        {arrayDecreasing.map((task) => (
          <Task key={task.id} task={task} listTasks={tasks}/>
        ))}
      </div>
    </div>
  );
}

export default Column