import { TabPanel } from "@/components/shared";

interface Props {
  selected: string;
}

export const Team = ({ selected }: Props) => {
  return (
    <TabPanel selected={selected} value="team">
      <div>Team</div>
    </TabPanel>
  );
};
