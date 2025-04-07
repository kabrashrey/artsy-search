import React from "react";
import { useNotification } from "./NotificationContext";

interface Props {
  id: string;
  message: string;
  type: "success" | "danger";
}

const Notification: React.FC<Props> = ({ id, message, type }) => {
  const { removeNotification } = useNotification();

  return (
    <div
      className={`alert alert-${type} d-flex align-items-center justify-content-between`}
      style={{ minWidth: "250px", marginBottom: "10px" }}
    >
      <span>{message}</span>
      <button className="btn-close" onClick={() => removeNotification(id)} />
    </div>
  );
};

export default Notification;
