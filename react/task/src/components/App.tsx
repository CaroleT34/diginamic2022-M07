import "./App.css";
import React from "react";
import Task from "./Task";
import { useState, useEffect } from "react";
import TaskInterface from "../Interface/TaskInterface";
import Data from "../services/Data";
import FormAdd from './FormAdd';

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  useEffect(() => {
    (async () => {
      const loadedTasks: TaskInterface[] = await Data.loadTasks();
      // Modification du state
      setTasks(loadedTasks);
    })();
  }, [tasks]);
  const handleClickValidate = (
    event: React.MouseEvent<HTMLButtonElement>,
    task_id: number
  ): void => {
    // console.log(`Dans handleClickValidate`, task_id);

    const copy_tasks = tasks.map((task) => {
      if (task_id === task.id) {
        task.done = !task.done;
        Data.ValidateTasks(task_id, task.done);
      }
      return task;
    });
    setTasks(copy_tasks);
  };
  const handleClickDelete = (
    task_id: number
  ): void => {
    // console.log(`Dans handleClickDelete`, task_id);

    const copy_tasks = tasks.map((task) => {
      if (task_id === task.id) {
        if (window.confirm("Voulez-vous supprimer la tâche de "+task.description+" ?")) {
        Data.DeleteTasks(task_id);
        }
      }
      return task;
    });
    setTasks(copy_tasks);
  };
  const handleSubmitAdd = async (event, task_id) => {
    event.preventDefault();
    console.log(`Dans handleSubmitAdd`);
    await Data.addTask(task_id);
    const loaded_counters = await Data.loadTasks();
    setTasks(loaded_counters);
  }

  const sorted_tasks = [...tasks].sort((a, b) => {
    if (a.done === b.done) return -1;
    else return 1;
  });
  return (
    <div className="App container">
      <h1>Liste des tâches</h1>
      <FormAdd
        onAdd={handleSubmitAdd}
      />
      {sorted_tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onClickValidate={handleClickValidate}
          onClickDelete={handleClickDelete}
        />
      ))}
    </div>
  );
}

export default App;
