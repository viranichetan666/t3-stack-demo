export type TaskType = {
  id: string;
  name: string;
  description: string;
  checked: boolean;
  todoItem: SubTaskType[];
};
  
export type SubTaskType = {
  id: string;
  name: string;
  checked: boolean;
  taskId: string;
};