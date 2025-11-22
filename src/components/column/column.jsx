import { useDroppable } from "@dnd-kit/core";
import Task from "../task/task";
import style from "./column.module.css"

function Column({ id, title, tasks, start }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const arrayDecreasing = tasks.sort((a, b) => b.priority - a.priority)
  return (
    
    <div
      onDragStart={() => alert('oi')}
      ref={setNodeRef}
      className={`${style.board} ${isOver ? style.highlight : ""}`}>

      <p className={style.title}>{title}</p>

      <div className={start ? style.scroll : style.carrossel}>
        {arrayDecreasing.map((task) => (
          <Task key={task.id} task={task} start={start}/>
        ))}
      </div>
    </div>
  );
}

export default Column