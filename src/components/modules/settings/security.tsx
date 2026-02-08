import { TabPanel } from "@/components/shared";

interface Props {
  selected: string;
}

export const Security = ({ selected }: Props) => {
  return (
    <TabPanel selected={selected} value="security">
      <div>Security</div>
    </TabPanel>
  );
};
