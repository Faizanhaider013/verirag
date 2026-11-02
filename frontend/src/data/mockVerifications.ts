import type { VerificationRecord } from "@/types";

// Synthetic verification attempts for the prototype history page.

export const mockVerifications: VerificationRecord[] = [
  {
    id: "VER-5021",
    documentId: "DOC-1042",
    documentName: "Data_Retention_Policy.pdf",
    version: "1.2",
    expectedHash:
      "0x9f2c1a7e4b8d60f3a1c5e9b27d4f8a0c6e3b1d9f2a4c7e0b85d1f6a3c9e2b7d04",
    actualHash:
      "0x9f2c1a7e4b8d60f3a1c5e9b27d4f8a0c6e3b1d9f2a4c7e0b85d1f6a3c9e2b7d04",
    verifiedAt: "2026-11-01T14:02:00Z",
    result: "verified",
  },
  {
    id: "VER-5020",
    documentId: "DOC-1031",
    documentName: "Incident_Response_Plan.docx",
    version: "2.1",
    expectedHash:
      "0xc6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8",
    actualHash:
      "0xc6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ec0000b4d0a8",
    verifiedAt: "2026-11-01T13:47:00Z",
    result: "modified",
  },
  {
    id: "VER-5019",
    documentId: "DOC-1038",
    documentName: "Employee_Code_of_Conduct.pdf",
    version: "3.0",
    expectedHash:
      "0x2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b",
    actualHash:
      "0x2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b",
    verifiedAt: "2026-10-31T09:20:00Z",
    result: "verified",
  },
  {
    id: "VER-5018",
    documentId: "DOC-1013",
    documentName: "Information_Security_Policy.txt",
    version: "2.3",
    expectedHash:
      "0xa4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9",
    actualHash:
      "0xa4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8aFF135ecf927b4d0a8c6e3f1b2d9",
    verifiedAt: "2026-10-30T16:11:00Z",
    result: "modified",
  },
  {
    id: "VER-5017",
    documentId: "DOC-1019",
    documentName: "Clinical_SOP_Sample_Handling.pdf",
    version: "4.2",
    expectedHash:
      "0xb4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927",
    actualHash:
      "0xb4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927",
    verifiedAt: "2026-10-29T11:05:00Z",
    result: "verified",
  },
  {
    id: "VER-5016",
    documentId: "DOC-1025",
    documentName: "Vendor_Master_Agreement.pdf",
    version: "1.0",
    expectedHash:
      "0x70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b",
    actualHash:
      "0x70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b",
    verifiedAt: "2026-10-28T08:33:00Z",
    result: "verified",
  },
  {
    id: "VER-5015",
    documentId: "DOC-1001",
    documentName: "Business_Continuity_Plan.pdf",
    version: "1.1",
    expectedHash:
      "0xcf927b4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135e",
    actualHash:
      "0xcf927b4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135e",
    verifiedAt: "2026-10-27T15:49:00Z",
    result: "verified",
  },
  {
    id: "VER-5014",
    documentId: "DOC-0994",
    documentName: "Privacy_Notice_Customers.pdf",
    version: "2.0",
    expectedHash:
      "0xd1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9a4c7e05b8",
    actualHash:
      "0xd1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9a4c7e05b8",
    verifiedAt: "2026-10-26T10:02:00Z",
    result: "verified",
  },
  {
    id: "VER-5013",
    documentId: "DOC-1007",
    documentName: "Expense_Reimbursement_Guidelines.docx",
    version: "1.4",
    expectedHash:
      "0x135ecf927b4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60",
    actualHash:
      "0x135ecf927b4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60",
    verifiedAt: "2026-10-25T13:30:00Z",
    result: "verified",
  },
  {
    id: "VER-5012",
    documentId: "DOC-0988",
    documentName: "Onboarding_Checklist.txt",
    version: "1.0",
    expectedHash:
      "0xe05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9a4c7",
    actualHash:
      "0xe05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9a4c7",
    verifiedAt: "2026-10-24T09:18:00Z",
    result: "verified",
  },
];
