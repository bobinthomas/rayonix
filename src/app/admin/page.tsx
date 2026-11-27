import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "CMS Admin",
  description: "Rayonix Content Management System",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
