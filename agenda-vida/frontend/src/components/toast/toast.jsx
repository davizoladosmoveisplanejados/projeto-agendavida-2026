import { useApp } from "../../context/AppContext";
import "./toast.css";

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: "✓",
    warning: "⚠️",
    info: "ℹ️",
    danger: "✕"
  };

  return (
    <div className={`custom-toast ${toast.type}`}>
      <span className="toast-icon">{icons[toast.type] || "ℹ️"}</span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
