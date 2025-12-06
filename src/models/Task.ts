export const TASK_KEY = "tasks";

export enum TaskState {
  Creating = "creating",
  Created = "created",
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  state?: TaskState;
}
