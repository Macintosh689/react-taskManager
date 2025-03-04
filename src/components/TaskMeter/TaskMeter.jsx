import { useEffect, useState } from "react";
import st from "./TaskMeter.module.scss";
import star from "../../assets/star.svg";

export default function TaskMeter({ tasks }) {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      setTotalTasks(tasks.length); // Общее количество задач
      setCompletedTasks(tasks.filter((task) => task.status === "Done").length); // Количество выполненных задач
    }
  }, [tasks]);

  // Вычисляем процент выполнения
  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className={st.root}>
      <div className={st.topRow}>
        <p>Task Meter</p>
        <p>
          <span className={st.complete}>{completedTasks}</span>/{totalTasks}
        </p>
      </div>
      <div className={st.bottomRow}>
        <div className={st.progress}>
          <div
            className={st.progressBar}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className={st.status}>
          <img src={star} alt="Star icon" className={st.star} />
          {completionPercentage >= 100 ? "Good Job!" : "Keep Going!"}
        </div>
      </div>
    </div>
  );
}
