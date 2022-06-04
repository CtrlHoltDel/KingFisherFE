import { useDispatch, useSelector } from "react-redux";
import { addTable, removeTable } from "./tablesSlice";

const Tables = () => {
  const tables = useSelector((state) => state.tables.tables);
  const dispatch = useDispatch();


  return (
    <div>
      {tables.map((table) => {
        return <div key={table.id}>{table.id} <button onClick={() => dispatch(removeTable())}>Click</button></div>;
      })}
      <button onClick={() => dispatch(addTable())}>Add a table</button>
    </div>
  );
};

export default Tables;
