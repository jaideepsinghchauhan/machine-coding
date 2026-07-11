import { useRef, useState } from "react";
import "./style.css";

interface Toast {
  id: number;
  message: string;
  type: string;
}
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export default function ToastContainer() {
  const [position, setPosition] = useState<ToastPosition>("top-right");

  const [toasts, setToasts] = useState<Toast[]>([]);
  // useRef persists data across re-renders WITHOUT triggering a re-render when it changes
  // (unlike useState, which re-renders the component every time it updates)
  // Here, we use it to store setTimeout references, keyed by toast id
  const toastRef = useRef<any>([]);

  const handleClose = (id: any) => {
    // cancel the pending auto-close timeout - prevents a stale/duplicate close
    // call later if the user manually closes the toast before the 5s timer fires
    clearTimeout(toastRef.current[id]);
    delete toastRef.current[id]; // cleanup - avoid holding onto stale references

    setToasts((prev) => {
      const filteredToasts = prev.filter((toast) => toast.id !== id);
      return filteredToasts;
    });
  };
  const handleAdd = (message: string, type: string) => {
    const id = new Date().getTime();
    setToasts((prev) => [...prev, { id, message, type }]);
    // store the timeout reference against this toast's id,
    // so it can be manually cancelled later via handleClose
    toastRef.current[id] = setTimeout(() => handleClose(id), 5000);
  };
  return (
    <div className="my-container">
      <div className={`toast-container ${position}`}>
        {toasts.map(({ id, message, type }) => {
          return (
            <div className={`toast ${type}`} key={id}>
              {message} Toast
              <span onClick={() => handleClose(id)} className="close-icon">
                &times;
              </span>
            </div>
          );
        })}
      </div>

      <div className="button-container">
        <button className="btn-position" onClick={() => setPosition("top-left")}>Top Left</button>
        <button className="btn-position" onClick={() => setPosition("top-right")}>Top Right</button>
        <button className="btn-position" onClick={() => setPosition("bottom-left")}>Bottom Left</button>
        <button className="btn-position" onClick={() => setPosition("bottom-right")}>Bottom Right</button>
      </div>

      <div className="button-container">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          onClick={() => handleAdd("Success", "success")}
        >
          Success
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => handleAdd("Info", "info")}
        >
          Info
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          onClick={() => handleAdd("Warning", "warning")}
        >
          Warning
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => handleAdd("Error", "error")}
        >
          Error
        </button>
      </div>
    </div>
  );
}
