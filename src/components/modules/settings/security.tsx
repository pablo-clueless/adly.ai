"use client";

import { RiDeleteBinLine, RiShieldCheckLine, RiSmartphoneLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TabPanel } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";

interface Props {
  selected: string;
}

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

const MOCK_SESSIONS: Session[] = [
  {
    id: "1",
    device: "Windows PC",
    browser: "Chrome 120",
    location: "New York, US",
    ip: "192.168.1.xxx",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "2",
    device: "iPhone 15",
    browser: "Safari Mobile",
    location: "New York, US",
    ip: "192.168.1.xxx",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
  {
    id: "3",
    device: "MacBook Pro",
    browser: "Firefox 121",
    location: "Boston, US",
    ip: "10.0.0.xxx",
    lastActive: "Yesterday",
    isCurrent: false,
  },
];

export const Security = ({ selected }: Props) => {
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChangePassword = async () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordForm.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setIsChangingPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsChangingPassword(false);
    setPasswordForm({ current: "", new: "", confirm: "" });
    toast.success("Password changed successfully!");
  };

  const handleEnable2FA = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTwoFactorEnabled(true);
    setTwoFactorDialogOpen(false);
    toast.success("Two-factor authentication enabled!");
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    toast.success("Two-factor authentication disabled");
  };

  const handleRevokeSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
    toast.success("Session revoked");
  };

  const handleRevokeAllSessions = () => {
    setSessions(sessions.filter((s) => s.isCurrent));
    toast.success("All other sessions revoked");
  };

  return (
    <TabPanel selected={selected} value="security">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Security Settings</h3>
          <p className="text-sm text-gray-500">Manage your password and security preferences</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h4 className="mb-4 font-medium">Change Password</h4>
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <div className="relative">
                <Input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  placeholder="Enter current password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative">
                <Input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  placeholder="Enter new password"
                />
              </div>
              <p className="text-xs text-gray-500">Minimum 8 characters with uppercase, lowercase, and numbers</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <div className="relative">
                <Input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <Button onClick={handleChangePassword} disabled={isChangingPassword}>
              {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 rounded-lg p-3">
                <RiShieldCheckLine className="text-primary-600 size-6" />
              </div>
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                {twoFactorEnabled && (
                  <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Enabled
                  </span>
                )}
              </div>
            </div>
            {twoFactorEnabled ? (
              <Button variant="outline" onClick={handleDisable2FA}>
                Disable 2FA
              </Button>
            ) : (
              <Dialog open={twoFactorDialogOpen} onOpenChange={setTwoFactorDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Enable 2FA</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <div>
                    <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
                    <DialogDescription>Scan the QR code with your authenticator app</DialogDescription>
                  </div>
                  <div className="space-y-4 py-4">
                    <div className="flex justify-center">
                      <div className="flex size-48 items-center justify-center rounded-lg bg-gray-100">
                        <span className="text-sm text-gray-500">[QR Code Placeholder]</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-center text-sm text-gray-600">Can&apos;t scan? Enter this code manually:</p>
                      <div className="rounded-lg bg-gray-100 p-3 text-center font-mono text-sm">
                        ABCD-EFGH-IJKL-MNOP
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Verification Code</label>
                      <Input placeholder="Enter 6-digit code" maxLength={6} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setTwoFactorDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEnable2FA}>Verify & Enable</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h4 className="font-medium">Active Sessions</h4>
              <p className="text-sm text-gray-500">Manage devices where you&apos;re currently logged in</p>
            </div>
            {sessions.length > 1 && (
              <Button variant="outline" size="sm" onClick={handleRevokeAllSessions}>
                Revoke All Others
              </Button>
            )}
          </div>
          <div className="divide-y">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-gray-100 p-2">
                    <RiSmartphoneLine className="size-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.isCurrent && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {session.browser} • {session.location} • {session.ip}
                    </p>
                    <p className="text-xs text-gray-400">{session.lastActive}</p>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRevokeSession(session.id)}
                  >
                    <RiDeleteBinLine className="size-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h4 className="mb-4 font-medium">Security Recommendations</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={cn("size-2 rounded-full", twoFactorEnabled ? "bg-green-500" : "bg-yellow-500")} />
              <span className="text-sm">
                {twoFactorEnabled
                  ? "Two-factor authentication is enabled"
                  : "Enable two-factor authentication for better security"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-green-500" />
              <span className="text-sm">Password was changed in the last 90 days</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-green-500" />
              <span className="text-sm">No suspicious login activity detected</span>
            </div>
          </div>
        </div>
      </div>
    </TabPanel>
  );
};
