import { createContext } from "react";
import { useSnackbar } from "notistack";

const ToastContext = createContext(null);
const ToastProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };
  return (
    <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
