import type { DayItemProps } from "@/types";

interface Props {
  dayItem: DayItemProps;
  onClick: () => void;
}

export const DayItem = ({}: Props) => {
  return (
    <div className="aspect-square">
      <div></div>
    </div>
  );
};
