import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (message: string) => {
  return toast.success(message, {
    position: "bottom-left",
    hideProgressBar: false,
    pauseOnHover: true,
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
  });
};

export const notifyError = (message: string) => {
  return toast.error(message, {
    position: "bottom-left",
    hideProgressBar: true,
    pauseOnHover: true,
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
  });
};
