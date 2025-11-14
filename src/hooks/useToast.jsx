import { useContext } from "react";
import { ToastContext } from "../contexts/ToastProvider";

export function useToast() {
  return useContext(ToastContext);
}
