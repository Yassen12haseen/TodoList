import { useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { useContext } from "react";
import { v4 as uid } from "uuid";

export function Input({ closeModal }) {
  const [tasks, setTasks] = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newTodo = {
          id: uid(),
          title: formData.title,
          description: formData.description,
          completed: false,
        };
        setTasks([...tasks, newTodo]);
        closeModal();
      }}
      className="flex flex-col gap-3.5 justify-center items-center w-full max-w-md rounded-full"
    >
      <input
        value={formData.title}
        onChange={(e) => {
          setFormData({ ...formData, title: e.target.value });
        }}
        type="text"
        placeholder="Title"
        className="pl-6 w-full h-12 text-sm border bg-[#3A3C44] border-gray-500/30 rounded-full placeholder-gray-500 text-gray-200 outline-none placeholder:text-sm placeholder:font-medium"
        required
      />
      <input
        value={formData.description}
        onChange={(e) => {
          setFormData({ ...formData, description: e.target.value });
        }}
        type="text"
        placeholder="Description"
        className="pl-6 w-full h-12 text-sm border bg-[#3A3C44] border-gray-500/30 rounded-full placeholder-gray-500 text-gray-200 outline-none placeholder:text-sm placeholder:font-medium"
        required
      />
      <button
        type="submit"
        className="bg-[#A78BFA] active:scale-95 w-56 h-10.5 rounded-full text-sm font-medium text-[#F5F5F5] cursor-pointer mr-0.5 hover:bg-[#8B5CF6] hover:text-white transition-all duration-300"
      >
        Save Task
      </button>
    </form>
  );
}
