import st from "./TaskItem.module.scss";
import more from "../../assets/more.svg";
import person from "../../assets/person.svg";
import deadline from "../../assets/deadline.svg";
import { useDrag } from "react-dnd";
import classNames from "classnames";
import { priorityClassName } from "../../utills";
import { useState, useEffect } from "react";
export default function TaskItem({ task, onEdit, onDelete }) {
  const [comboOpen, setComboOpen] = useState(false);

  function handleMenuOpen(num) {
    setComboOpen((prev) => ({ ...prev, [num]: !prev[num] }));
  }

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboOpen && !event.target.closest(`.${st.comboBody}`)) {
        setComboOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [comboOpen]);

  return (
    <div
      ref={drag}
      className={classNames(st.root, isDragging ? st.drag : null)}
    >
      <div className={st.task}>
        <div className={st.header}>
          <div className={st.projectName}>{task.project}</div>
          <div className={st.menuMore}>
            <img
              src={more}
              className={st.more}
              alt=""
              onClick={() => {
                handleMenuOpen(1);
              }}
            />
            <div
              className={
                comboOpen[1]
                  ? st.comboBody + " " + st.comboBodyOpenBig
                  : st.comboBody
              }
            >
              <div
                onClick={() => {
                  handleMenuOpen();
                  onEdit(task.id); 
                }}
                className={st.comboItem}
              >
                <span>Редактировать</span>
              </div>
              <div
                onClick={() => {
                  handleMenuOpen();
                  onDelete(task.id); 
                }}
                className={st.comboItem}
              >
                <span>Удалить</span>
              </div>
            </div>
          </div>
        </div>
        <div className={st.title}>{task.name}</div>
        <div className={st.description}>
          {task.description} 
        </div>
        <div className={st.labels}>
          <div
            className={classNames(
              st.label,
              st[priorityClassName[task.priority]]
            )}
          >
            {task.priority}
          </div>
        </div>
        <div className={st.footer}>
          <div className={st.deadline}>
            <img src={deadline} alt="" />
            {task.dateTime}
          </div>
          <div className={st.lead}>
            <img src={person} alt="" />
            {task.assignee}

            {/* <span>Json Statham</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}