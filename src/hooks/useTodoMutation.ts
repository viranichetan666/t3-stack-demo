import { TaskType } from "../interfaces/todo";
import { trpc } from "../utils/trpc";

export const useTodoMutation = (
  mutationName: any,
  callback: (
    TodoItem: TaskType[] | undefined,
    params: any
  ) => TaskType[] | undefined,
  invalidateQueries: boolean = false,
) => {
  const trpcContext = trpc.useContext();
  return trpc.useMutation([mutationName], {
    onSuccess() {
      if(invalidateQueries) {
        trpcContext.invalidateQueries(["task.getAllTasks"]);
      }
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