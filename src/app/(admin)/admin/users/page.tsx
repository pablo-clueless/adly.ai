"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  RiDeleteBinLine,
  RiLockLine,
  RiLockUnlockLine,
  RiMailLine,
  RiRefreshLine,
  RiUserAddLine,
} from "@remixicon/react";

import { DataTable, Pagination } from "@/components/shared";
import { slideUpVariants, useReducedMotion } from "@/lib/motion";
import { columns } from "@/config/columns/admin-users";
import type { AdminUserProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";
import { cn, paginate } from "@/lib";

import { MOCK_ADMIN_USERS } from "@/__mock__";

const PAGE_SIZE = 10;

type FilterTab = "all" | "active" | "suspended" | "pending";

const Page = () => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(1);

  const query = useDebounce(searchTerm, 500);

  const filtered = useMemo(() => {
    let users = [...MOCK_ADMIN_USERS];

    if (activeTab !== "all") {
      users = users.filter((u) => u.status === activeTab);
    }

    if (query) {
      users = users.filter(
        (user) =>
          user.full_name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.profile.company_name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return users;
  }, [query, activeTab]);

  const paginated = useMemo(() => {
    return paginate(filtered, page, PAGE_SIZE, filtered.length);
  }, [filtered, page]);

  const selectedUsers = useMemo(() => {
    return Object.entries(selectedRows)
      .filter(([, isSelected]) => isSelected)
      .map(([index]) => paginated[parseInt(index)])
      .filter(Boolean) as AdminUserProps[];
  }, [selectedRows, paginated]);

  const hasSelection = selectedUsers.length > 0;

  const handleRowSelectionChange = useCallback((selection: Record<string, boolean>) => {
    setSelectedRows(selection);
  }, []);

  const handleSuspend = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select users to suspend");
      return;
    }
    const activeUsers = selectedUsers.filter((u) => u.status === "active");
    if (activeUsers.length === 0) {
      toast.info("Selected users are already suspended or pending");
      return;
    }
    toast.success(`${activeUsers.length} user(s) suspended`);
    setSelectedRows({});
  }, [hasSelection, selectedUsers]);

  const handleActivate = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select users to activate");
      return;
    }
    const inactiveUsers = selectedUsers.filter((u) => u.status !== "active");
    if (inactiveUsers.length === 0) {
      toast.info("Selected users are already active");
      return;
    }
    toast.success(`${inactiveUsers.length} user(s) activated`);
    setSelectedRows({});
  }, [hasSelection, selectedUsers]);

  const handleDelete = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select users to delete");
      return;
    }
    toast.success(`${selectedUsers.length} user(s) deleted`);
    setSelectedRows({});
  }, [hasSelection, selectedUsers]);

  const handleSendEmail = useCallback(() => {
    if (!hasSelection) {
      toast.error("Please select users to email");
      return;
    }
    toast.success(`Email sent to ${selectedUsers.length} user(s)`);
    setSelectedRows({});
  }, [hasSelection, selectedUsers]);

  const handleRefresh = useCallback(() => {
    toast.success("Users refreshed");
  }, []);

  const variants = shouldReduceMotion ? {} : slideUpVariants;

  const filterTabs: { label: string; value: FilterTab; count: number }[] = [
    { label: "All Users", value: "all", count: MOCK_ADMIN_USERS.length },
    { label: "Active", value: "active", count: MOCK_ADMIN_USERS.filter((u) => u.status === "active").length },
    { label: "Suspended", value: "suspended", count: MOCK_ADMIN_USERS.filter((u) => u.status === "suspended").length },
    { label: "Pending", value: "pending", count: MOCK_ADMIN_USERS.filter((u) => u.status === "pending").length },
  ];

  return (
    <motion.div
      className="h-full w-full space-y-6 overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <motion.div
        className="flex w-full items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <p className="text-2xl font-semibold">User Management</p>
          <p className="mt-1 text-sm text-gray-500">Manage platform users and their permissions</p>
        </div>
      </motion.div>

      <div className="space-y-2">
        <motion.div
          className="flex w-full items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className="flex items-center gap-x-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filterTabs.map((tab) => (
              <Button
                key={tab.value}
                size="sm"
                variant={activeTab === tab.value ? "default" : "outline"}
                onClick={() => {
                  setActiveTab(tab.value);
                  setPage(1);
                }}
                className={cn(activeTab === tab.value && "bg-primary-500 text-white")}
              >
                {tab.label}
                <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{tab.count}</span>
              </Button>
            ))}
          </motion.div>
          <motion.div
            className="flex items-center gap-x-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button size="sm">
              <RiUserAddLine /> Add User
            </Button>
            <Button size="sm" variant="outline" onClick={handleRefresh}>
              <RiRefreshLine /> Refresh
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className="flex w-full items-center justify-between gap-x-4">
          <Input
            wrapperClassName="w-full sm:w-1/3"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email, company..."
            type="search"
            value={searchTerm}
          />
          <div className="text-sm text-gray-500">
            {filtered.length} user{filtered.length !== 1 ? "s" : ""}
            {hasSelection && ` (${selectedUsers.length} selected)`}
          </div>
        </motion.div>

        <motion.div className="flex w-full items-center gap-x-2">
          <Button size="sm" variant="outline" onClick={handleActivate} disabled={!hasSelection}>
            <RiLockUnlockLine /> Activate
          </Button>
          <Button size="sm" variant="outline" onClick={handleSuspend} disabled={!hasSelection}>
            <RiLockLine /> Suspend
          </Button>
          <Button size="sm" variant="outline" onClick={handleSendEmail} disabled={!hasSelection}>
            <RiMailLine /> Send Email
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDelete}
            disabled={!hasSelection}
            className="text-red-500 hover:text-red-600"
          >
            <RiDeleteBinLine /> Delete
          </Button>
        </motion.div>
      </div>

      <div className="w-full space-y-6">
        <DataTable
          columns={columns}
          data={paginated}
          onRowSelectionChange={handleRowSelectionChange}
          rowSelection={selectedRows}
        />
        <Pagination current={page} limit={PAGE_SIZE} onPageChange={setPage} total={filtered.length} />
      </div>
    </motion.div>
  );
};

export default Page;
