import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./axios/utils";
import { toast } from "react-toastify";
export const useFetchTasks = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading: createTaskLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task added");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, createTaskLoading };
};
export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) =>
      customFetch.patch(`/${taskId}`, { isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task updated");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { editTask };
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
    mutationFn: (id) => customFetch.delete("/" + id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.warning("task deleted");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { deleteTask, deleteTaskLoading };
};
