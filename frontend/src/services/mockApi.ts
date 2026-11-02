// Mock service layer for the VeriRAG prototype.
//
// IMPORTANT: Every function here returns synthetic data from local mock files.
// No real backend, RAG pipeline, or blockchain is contacted. These functions are
// shaped to mirror a future FastAPI client so the UI can be wired to a real
// backend later with minimal changes.

import { mockDocuments } from "@/data/mockDocuments";
import { mockTransactions } from "@/data/mockTransactions";
import { mockVerifications } from "@/data/mockVerifications";
import {
  cannedAnswers,
  defaultAnswer,
  mockConversations,
} from "@/data/mockChats";
import {
  dashboardStats,
  registrationsByMonth,
  systemHealth,
  verificationSplit,
} from "@/data/mockStats";
import type {
  BlockchainTransaction,
  ChatMessage,
  Conversation,
  DashboardStats,
  SystemHealthItem,
  VeriDocument,
  VerificationRecord,
} from "@/types";

/** Artificial latency so loading states are visible in the prototype. */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getDocuments(): Promise<VeriDocument[]> {
  await delay(250);
  return mockDocuments;
}

export async function getDocumentById(
  id: string,
): Promise<VeriDocument | undefined> {
  await delay(150);
  return mockDocuments.find((d) => d.id === id);
}

export async function getTransactions(): Promise<BlockchainTransaction[]> {
  await delay(250);
  return mockTransactions;
}

export async function getVerifications(): Promise<VerificationRecord[]> {
  await delay(250);
  return mockVerifications;
}

export async function getDashboard(): Promise<{
  stats: DashboardStats;
  verificationSplit: typeof verificationSplit;
  registrationsByMonth: typeof registrationsByMonth;
  systemHealth: SystemHealthItem[];
}> {
  await delay(200);
  return {
    stats: dashboardStats,
    verificationSplit,
    registrationsByMonth,
    systemHealth,
  };
}

export async function getConversations(): Promise<Conversation[]> {
  await delay(150);
  return mockConversations;
}

/**
 * Produce a canned assistant reply for a question, including per-document
 * citations with their own verification status. Purely frontend simulation.
 */
export async function askQuestion(question: string): Promise<ChatMessage> {
  await delay(650);
  const q = question.toLowerCase();
  const hit = cannedAnswers.find((a) => a.match.some((m) => q.includes(m)));
  const answer = hit ?? defaultAnswer;
  return {
    id: `m-${Date.now()}`,
    role: "assistant",
    content: answer.content,
    timestamp: new Date().toISOString(),
    citations: answer.citations ?? [],
  };
}

export interface UploadStep {
  key: string;
  label: string;
}

export const uploadSteps: UploadStep[] = [
  { key: "selected", label: "Document selected" },
  { key: "processed", label: "Document processed" },
  { key: "hashed", label: "SHA-256 hash generated" },
  { key: "registered", label: "Hash registered on blockchain (simulated)" },
  { key: "indexed", label: "Document indexed into RAG knowledge base" },
];

/** Deterministic-looking pseudo hash for the upload simulation (not a real hash). */
export function fakeHashFromName(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  const hex = "0123456789abcdef";
  let out = "0x";
  let seed = h || 1;
  for (let i = 0; i < 64; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    out += hex[seed % 16];
  }
  return out;
}

export function fakeTxId(): string {
  const hex = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 64; i++) out += hex[Math.floor(Math.random() * 16)];
  return out;
}
