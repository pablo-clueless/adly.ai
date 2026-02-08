import { TabPanel } from "@/components/shared";

interface Props {
  selected: string;
}

export const Notification = ({ selected }: Props) => {
  return (
    <TabPanel selected={selected} value="notifications">
      <div>Notification</div>
    </TabPanel>
  );
};
