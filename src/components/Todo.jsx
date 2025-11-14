import PositionedMenu from "./options";
import { useTask } from "../hooks/useTask";
import { useMemo, useState } from "react";

export function Todo({ tab }) {
  const tasks = useTask();
  const filteredTasks = useMemo(() => {
    return tab === "All"
      ? tasks
      : tab === "Completed"
      ? tasks.filter((todo) => todo.completed)
      : tasks.filter((todo) => !todo.completed);
  }, [tasks, tab]);

  return (
    <main className="flex flex-col gap-2 justify-center items-center w-full">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((todo) => (
          <div
            key={todo.id}
            className={`flex gap-2 justify-between items-center rounded-xl p-2 w-full ${
              todo.completed
                ? "bg-[#186d4a6c] decoration-1 line-through decoration-[#e0e0e0b7]"
                : "bg-transparent"
            }`}
          >
            <div className="flex overflow-x-hidden flex-col gap-1 justify-center">
              <h2 className="text-[#F5F5F5] font-medium text-sm sm:text-base ">
                {todo.title}
              </h2>
              <p className="overflow-hidden text-xs font-medium text-gray-400">
                {todo.description}
              </p>
            </div>
            <PositionedMenu todoId={todo.id} />
          </div>
        ))
      ) : (
        <p className="font-medium text-gray-400 sm:text-xl">
          there is no tasks 😴
        </p>
      )}
    </main>
  );
}
export default function Tabs() {
  const tabs = ["All", "Completed", "Incomplete"];
  const [selected, setSelected] = useState("All");

  return (
    <>
      <div className="flex gap-2 justify-between items-center my-5 w-full text-sm bg-transparent rounded-2xl border border-gray-500/50">
        {tabs.map((option) => (
          <div key={option} className="flex justify-center items-center">
            <input
              type="radio"
              name="options"
              id={option}
              className="hidden peer"
              checked={option == selected}
              onChange={() => {
                setSelected(option);
              }}
            />
            <label
              htmlFor={option}
              style={{
                fontSize: window.innerWidth <= 400 ? "0.75rem" : undefined, // text-xs = 0.75rem
                padding: window.innerWidth <= 400 ? "0.5rem 1rem" : undefined, // text-xs = 0.75rem
              }}
              className="cursor-pointer rounded-2xl py-2.5 sm:px-8.5 px-5 text-sm text-gray-400 font-medium transition-colors duration-200 peer-checked:bg-[#8B5CF6] peer-checked:text-white"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      <Todo tab={selected} />
    </>
  );
}
