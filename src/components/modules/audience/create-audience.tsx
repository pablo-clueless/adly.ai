"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CreateAudience = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
      <DialogTrigger asChild>
        <Button size="sm">Create Audience</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[65vw]">
        <div>
          <DialogTitle>Create Audience</DialogTitle>
          <DialogDescription>Follow the steps to set up your audience.</DialogDescription>
        </div>
        <div className="w-full space-y-4"></div>
      </DialogContent>
    </Dialog>
  );
};
