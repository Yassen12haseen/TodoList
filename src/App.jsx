import "./index.css";
import TodoList from "./components/TodoList";
import { TaskProvider } from "./contexts/TaskContext.jsx";

function App() {
  return (
    <div className="bg-[#1C1E26] p-4  flex justify-center items-center h-screen">
      <TaskProvider>
        <TodoList />
      </TaskProvider>
    </div>
  );
}

export default App;
