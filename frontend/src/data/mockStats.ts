import type { DashboardStats, SystemHealthItem } from "@/types";

export const dashboardStats: DashboardStats = {
  totalDocuments: 42,
  verifiedDocuments: 36,
  modifiedDocuments: 6,
  blockchainTransactions: 128,
  deltaDocuments: 4,
  deltaVerified: 3,
  deltaModified: 1,
  deltaTransactions: 11,
};

// Verified vs modified split for the dashboard donut chart.
export const verificationSplit = [
  { name: "Verified", value: 36, color: "#22c55e" },
  { name: "Modified", value: 6, color: "#ef4444" },
];

// Registrations per month for a small trend chart.
export const registrationsByMonth = [
  { month: "May", registrations: 3 },
  { month: "Jun", registrations: 5 },
  { month: "Jul", registrations: 6 },
  { month: "Aug", registrations: 8 },
  { month: "Sep", registrations: 7 },
  { month: "Oct", registrations: 9 },
  { month: "Nov", registrations: 4 },
];

export const systemHealth: SystemHealthItem[] = [
  {
    name: "Blockchain Connection",
    status: "operational",
    detail: "Hardhat local network · block #185,004",
  },
  {
    name: "RAG Pipeline",
    status: "operational",
    detail: "Embedding + retrieval responsive",
  },
  {
    name: "Vector Database",
    status: "operational",
    detail: "FAISS index · 3,214 chunks",
  },
  {
    name: "Backend API",
    status: "degraded",
    detail: "Elevated latency on /query (mock)",
  },
];
