import useLocalStorage from "use-local-storage";
import { TASK_KEY, TaskState, type Task } from "../models/Task";
import { delay } from "../helpers/Utils";
import { useState } from "react";

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASK_KEY, []);
  const [isUpdating, setUpdating] = useState(false);

  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(36).substring(2, 9),
        title: "",
        completed: false,
        state: TaskState.Creating,
      },
    ]);
  }

  async function updateTask(id: string, payload: { title: Task["title"] }) {
    setUpdating(true);

    await delay(1000);

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, state: TaskState.Created, ...payload }
          : task
      )
    );

    setUpdating(false);
  }

  function updateTaskStatus(id: string, completed: Task["completed"]) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdating,
  };
}
