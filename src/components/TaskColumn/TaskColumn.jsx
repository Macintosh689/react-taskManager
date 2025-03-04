import classNames from "classnames";
import TaskItem from "../TaskItem/TaskItem";
import st from "./TaskColumn.module.scss";
import { statusClassName } from "../../utills";
import { useDrop } from "react-dnd";
export default function TaskColumn({ status, list, moveTask, onEdit, onDelete }) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  
  return (
    <div ref={drop} className={st.root}>
      <div className={classNames(st.columnHeader, st[statusClassName[status]])}>
        <h2>{status}</h2>
        <div className={st.taskCounter}>{list.length}</div>
      </div>
      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {isOver && canDrop && <div className={st.over}></div>}
    </div>
  );
}