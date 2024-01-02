import SingleItem from "./SingleItem";
import { useFetchTasks } from "./reactQueryCustomHooks";

const Items = () => {
  const { isLoading, isError, data } = useFetchTasks();

  if (isLoading) {
    return <p style={{ marginTop: "3rem" }}> Loading...</p>;
  }
  if (isError) {
    return <p style={{ marginTop: "3rem" }}> There was an error...</p>;
  }
  // if (isError) {
  //   return <p style={{ marginTop: "3rem" }}> {error.response.data}</p>;
  // }
  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
