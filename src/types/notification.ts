export type NotificationType = "SYSTEM" | "INFO" | "WARNING" | "ERROR" | "SUCCESS";
export type NotificationStatus = "pending" | "read" | "unread";

export interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  status: NotificationStatus;
}
