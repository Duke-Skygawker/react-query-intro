import { useDeleteTask, useEditTask } from "./reactQueryCustomHooks";

const SingleItem = ({ item }) => {
  const { isDone, id, title } = item;
  const { deleteTask, deleteTaskLoading } = useDeleteTask();
  const { editTask } = useEditTask();

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => editTask({ taskId: id, isDone: !isDone })}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: isDone && "line-through",
        }}
      >
        {title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        disabled={deleteTaskLoading}
        onClick={() => deleteTask(id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
