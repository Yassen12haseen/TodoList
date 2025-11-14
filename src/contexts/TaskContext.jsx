import { createContext, useReducer, useEffect } from "react";
import CrudReducer from "../reducers/CrudReducer";

const TaskContext = createContext([]);
const DispatchContext = createContext(null);
const todosList = JSON.parse(localStorage.getItem("tasks")) || [];

function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(CrudReducer, todosList);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={tasks}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TaskContext.Provider>
  );
}
export { TaskProvider, TaskContext , DispatchContext };
