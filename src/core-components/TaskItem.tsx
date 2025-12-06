import ButtonIcon from "../components/ButtonIcon";
import Card from "../components/Card";
import InputCheckbox from "../components/InputCheckbox";
import Text from "../components/Text";

import CheckIcon from "../assets/icons/check.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { TaskState, type Task } from "../models/Task";
import { cx } from "class-variance-authority";
import useTask from "../hooks/useTask";
import Skeleton from "../components/Skeleton";

interface TaskItemProps {
  task: Task;
  loading?: boolean;
}

export default function TaskItem({ task, loading }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(task.state === TaskState.Creating);
  const [taskTitle, setTaskTitle] = useState(task.title || "");
  const { updateTask, updateTaskStatus, deleteTask, isUpdating } = useTask();

  function handleEditTask() {
    setIsEditing(true);
  }

  function handleExitTask() {
    if (task.state === TaskState.Creating) {
      deleteTask(task.id);
    }
    setIsEditing(false);
  }

  function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value || "");
  }

  async function handleSaveTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateTask(task.id, { title: taskTitle });
    setIsEditing(false);
  }

  function handleChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>) {
    updateTaskStatus(task.id, e.target.checked);
  }

  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <Card size="md">
      {!isEditing ? (
        <div className="flex items-center gap-3">
          <InputCheckbox
            checked={task?.completed}
            onChange={handleChangeTaskStatus}
            loading={loading}
          />
          {!loading ? (
            <Text className={cx("flex-1", { "line-through": task?.completed })}>
              {task?.title}
            </Text>
          ) : (
            <Skeleton className="w-full h-6" />
          )}
          <div className="flex gap-1">
            <ButtonIcon
              icon={TrashIcon}
              variant="tertiary"
              type="button"
              onClick={handleDeleteTask}
              loading={loading}
            />
            <ButtonIcon
              icon={PencilIcon}
              variant="tertiary"
              onClick={handleEditTask}
              type="button"
              loading={loading}
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveTask} className="flex items-center gap-3">
          <TextInput
            value={taskTitle}
            className="flex-1"
            onChange={handleChangeTaskTitle}
            required
            autoFocus
          />
          <div className="flex gap-1">
            <ButtonIcon
              icon={XIcon}
              variant="secondary"
              onClick={handleExitTask}
              type="button"
            />
            <ButtonIcon
              icon={CheckIcon}
              type="submit"
              variant="primary"
              handling={isUpdating}
            />
          </div>
        </form>
      )}
    </Card>
  );
}
