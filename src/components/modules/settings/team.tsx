"use client";

import { RiAddLine, RiDeleteBinLine, RiMailLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TabPanel } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { cn, getInitials } from "@/lib";

interface Props {
  selected: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "viewer";
  status: "active" | "pending";
  avatar?: string;
}

const MOCK_TEAM: TeamMember[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "owner", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin", status: "active" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "member", status: "active" },
  { id: "4", name: "Sarah Wilson", email: "sarah@example.com", role: "viewer", status: "pending" },
];

const ROLES = [
  { value: "admin", label: "Admin", description: "Full access to all features" },
  { value: "member", label: "Member", description: "Can create and edit campaigns" },
  { value: "viewer", label: "Viewer", description: "Read-only access" },
];

export const Team = ({ selected }: Props) => {
  const [team, setTeam] = useState<TeamMember[]>(MOCK_TEAM);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    setIsInviting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTeam([
      ...team,
      {
        id: String(Date.now()),
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole as TeamMember["role"],
        status: "pending",
      },
    ]);
    setIsInviting(false);
    setInviteOpen(false);
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    setInviteRole("member");
  };

  const handleRemove = (id: string) => {
    const member = team.find((m) => m.id === id);
    if (member?.role === "owner") {
      toast.error("Cannot remove the owner");
      return;
    }
    setTeam(team.filter((m) => m.id !== id));
    toast.success("Team member removed");
  };

  const handleRoleChange = (id: string, newRole: TeamMember["role"]) => {
    const member = team.find((m) => m.id === id);
    if (member?.role === "owner") {
      toast.error("Cannot change owner role");
      return;
    }
    setTeam(team.map((m) => (m.id === id ? { ...m, role: newRole } : m)));
    toast.success("Role updated");
  };

  const getRoleColor = (role: TeamMember["role"]) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-700";
      case "admin":
        return "bg-blue-100 text-blue-700";
      case "member":
        return "bg-green-100 text-green-700";
      case "viewer":
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <TabPanel selected={selected} value="team">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Team Members</h3>
            <p className="text-sm text-gray-500">Manage your team and their permissions</p>
          </div>
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <RiAddLine /> Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <div>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>Send an invitation to join your team</DialogDescription>
              </div>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <div className="space-y-2">
                    {ROLES.map((role) => (
                      <button
                        key={role.value}
                        onClick={() => setInviteRole(role.value)}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all",
                          inviteRole === role.value
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300",
                        )}
                      >
                        <div
                          className={cn(
                            "mt-0.5 size-4 rounded-full border-2",
                            inviteRole === role.value ? "border-primary-500 bg-primary-500" : "border-gray-300",
                          )}
                        />
                        <div>
                          <p className="font-medium">{role.label}</p>
                          <p className="text-xs text-gray-500">{role.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setInviteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInvite} disabled={isInviting}>
                  <RiMailLine />
                  {isInviting ? "Sending..." : "Send Invitation"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="grid grid-cols-12 gap-4 border-b bg-gray-50 px-6 py-3 text-sm font-medium text-gray-600">
            <div className="col-span-4">Member</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-2">Actions</div>
          </div>
          <div className="divide-y">
            {team.map((member) => (
              <div key={member.id} className="grid grid-cols-12 items-center gap-4 px-6 py-4">
                <div className="col-span-4 flex items-center gap-3">
                  <div className="bg-primary-100 text-primary-600 flex size-10 items-center justify-center rounded-full font-medium">
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="col-span-3">
                  {member.role === "owner" ? (
                    <span
                      className={cn("rounded-full px-2 py-1 text-xs font-medium capitalize", getRoleColor(member.role))}
                    >
                      {member.role}
                    </span>
                  ) : (
                    <Select
                      value={member.role}
                      onValueChange={(value) => handleRoleChange(member.id, value as TeamMember["role"])}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="col-span-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-medium capitalize",
                      member.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700",
                    )}
                  >
                    {member.status}
                  </span>
                </div>
                <div className="col-span-2">
                  {member.role !== "owner" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleRemove(member.id)}
                    >
                      <RiDeleteBinLine className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h4 className="mb-4 font-medium">Team Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow team members to invite others</p>
                <p className="text-sm text-gray-500">Admins can send invitations to new team members</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require admin approval for new members</p>
                <p className="text-sm text-gray-500">New members need approval before accessing the workspace</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
  );
};
