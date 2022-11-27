import { trpc } from "../utils/trpc";

export type TaskType = {
  id: string;
  name: string;
  description: string;
  checked: boolean;
  isExpanded: boolean;
  todoItem: any;
};

export type SubTaskType = {
  id: string;
  name: string;
  checked: boolean;
  taskId: string;
};

export const useTodoMutation = (
  routerPath: any,
  callback: (
    TodoItem: TaskType[] | undefined,
    params: any
  ) => TaskType[] | undefined
) => {
  const trpcContext = trpc.useContext();
  return trpc.useMutation([routerPath], {
    onSuccess() {
      trpcContext.invalidateQueries(["task.getAllTasks"]);
    },
    onMutate(params) {
      trpcContext.cancelQuery(["task.getAllTasks"]);
      const allData: TaskType[] | undefined = trpcContext.getQueryData([
        "task.getAllTasks",
      ]);
      const updatedData = callback(allData, params);
      trpcContext.setQueryData(
        ["task.getAllTasks"],
        updatedData ? updatedData : []
      );

      return allData;
    },
    onError: (_, __, context: TaskType[] | undefined) => {
      trpcContext.setQueryData(["task.getAllTasks"], context ? context : []);
    },
  });
};