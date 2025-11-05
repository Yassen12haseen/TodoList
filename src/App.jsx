import "./index.css";
import TodoList from "./components/TodoList";
import {TaskContext} from "./contexts/TaskContext.jsx"
import { useState, useEffect } from "react";

const todosList = JSON.parse(localStorage.getItem("tasks")) || [];


function App() {
  const [tasks , setTasks] = useState(todosList);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  return (
    <div className="bg-[#1C1E26] p-4  flex justify-center items-center h-screen">
      <TaskContext.Provider value={[tasks , setTasks]}>
        <TodoList />
      </TaskContext.Provider> 
    </div>
  );
}

export default App;
