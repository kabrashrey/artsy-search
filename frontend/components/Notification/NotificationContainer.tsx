import React from "react";
import Notification from "./Notification";
import { useNotification } from "./NotificationContext";

const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "20px",
        zIndex: 1050,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          id={notif.id}
          message={notif.message}
          type={notif.type}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
