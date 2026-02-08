import { TabPanel } from "@/components/shared";

interface Props {
  selected: string;
}

export const Profile = ({ selected }: Props) => {
  return (
    <TabPanel selected={selected} value="profile">
      <div>Profile</div>
    </TabPanel>
  );
};
