import TaskMeter from "./components/TaskMeter/TaskMeter";
import Modal from "./components/Modal/Modal";
import TaskColumn from "./components/TaskColumn/TaskColumn";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getSaveTasks, statusNames } from "./utills";
function App() {
  const [tasks, setTasks] = useState(getSaveTasks());
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) => {
      const taskExists = prevTasks.some((task) => task.id === taskId);

      if (!taskExists) {
        console.warn(`Task with ID ${taskId} does not exist.`);
        return prevTasks;
      }

      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
    });
  };
  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTask(taskToEdit);
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleSaveTask = (newTask) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editingTask.id ? newTask : task))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [...prev, newTask]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <header>
        <TaskMeter tasks={tasks} />
        <Modal addTask={handleSaveTask} editingTask={editingTask} />
      </header>
      <div className="columns">
        <TaskColumn
          status={statusNames.BLOCK}
          list={tasks.filter((task) => task.status === statusNames.BLOCK)}
          moveTask={moveTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        <TaskColumn
          status={statusNames.TODO}
          list={tasks.filter((task) => task.status === statusNames.TODO)}
          moveTask={moveTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        <TaskColumn
          status={statusNames.ONPROGRESS}
          list={tasks.filter((task) => task.status === statusNames.ONPROGRESS)}
          moveTask={moveTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        <TaskColumn
          status={statusNames.DONE}
          list={tasks.filter((task) => task.status === statusNames.DONE)}
          moveTask={moveTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </DndProvider>
  );
}

export default App;
