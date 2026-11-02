// Shared domain types for the VeriRAG frontend prototype.

export type VerificationStatus = "verified" | "modified" | "pending";

export type DocumentType = "PDF" | "DOCX" | "TXT";

export type TransactionAction = "Registered" | "New Version";

export type TransactionStatus = "confirmed" | "pending" | "failed";

export interface DocumentVersion {
  version: string;
  hash: string;
  uploadedAt: string;
  txId: string;
  note?: string;
}

export interface VeriDocument {
  id: string;
  name: string;
  type: DocumentType;
  category: string;
  description: string;
  version: string;
  uploadedBy: string;
  uploaderWallet: string;
  uploadedAt: string;
  sizeKb: number;
  hash: string; // current SHA-256 hash (on-chain reference)
  status: VerificationStatus;
  txId: string;
  blockNumber: number;
  versionHistory: DocumentVersion[];
}

export interface BlockchainTransaction {
  txId: string;
  documentId: string;
  documentName: string;
  action: TransactionAction;
  hash: string;
  wallet: string;
  blockNumber: number;
  timestamp: string;
  status: TransactionStatus;
  gasUsed: number;
}

export interface VerificationRecord {
  id: string;
  documentId: string;
  documentName: string;
  version: string;
  expectedHash: string;
  actualHash: string;
  verifiedAt: string;
  result: "verified" | "modified";
}

export interface Citation {
  documentId: string;
  documentName: string;
  version: string;
  hash: string;
  status: VerificationStatus;
  excerpt?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  citations?: Citation[];
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
}

export interface DashboardStats {
  totalDocuments: number;
  verifiedDocuments: number;
  modifiedDocuments: number;
  blockchainTransactions: number;
  deltaDocuments: number;
  deltaVerified: number;
  deltaModified: number;
  deltaTransactions: number;
}

export type SystemComponentStatus = "operational" | "degraded" | "down";

export interface SystemHealthItem {
  name: string;
  status: SystemComponentStatus;
  detail: string;
}
