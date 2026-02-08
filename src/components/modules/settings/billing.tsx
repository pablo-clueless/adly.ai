import { TabPanel } from "@/components/shared";

interface Props {
  selected: string;
}

export const Billing = ({ selected }: Props) => {
  return (
    <TabPanel selected={selected} value="billing">
      <div>Billing</div>
    </TabPanel>
  );
};
