import { trpc } from "../utils/trpc";

export const useTodos = () => {
  const { data, isLoading } = trpc.useQuery(["task.getAllTasks"]);
  return {
    data,
    isLoading,
  }
}
