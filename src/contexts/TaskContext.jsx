import { createContext } from "react";
import { v4 as uid } from "uuid";
export const TaskContext = createContext([
    {
        id: uid(),
        title: "Task 1",
        description: "This is a task",
        completed: false,
    },
]);