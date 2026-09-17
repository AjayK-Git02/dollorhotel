"use client";

import { AdminAuthGuard } from "@/components/AdminAuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      {children}
    </AdminAuthGuard>
  );
}
