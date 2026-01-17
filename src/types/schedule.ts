export interface DayItemProps {
  date: Date | null;
  schedule: string[];
}

export interface ScheduleProps {
  status: "free" | "occupied";
}
