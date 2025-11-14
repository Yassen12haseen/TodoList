import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

export function useTask() {
  return useContext(TaskContext);
}

import { DispatchContext } from "../contexts/TaskContext";

export function useDispatch() {
  return useContext(DispatchContext);
}
