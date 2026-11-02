import type { Conversation } from "@/types";

export const suggestedQuestions: string[] = [
  "Summarize our latest approved policy.",
  "What documents have been modified?",
  "Explain our data retention requirements.",
  "Find documents related to compliance.",
];

// Predefined, canned assistant answers keyed by a lowercased question match.
// Each answer carries per-document citations with their own verification status.
export interface CannedAnswer {
  match: string[];
  content: string;
  citations: Conversation["messages"][number]["citations"];
}

export const cannedAnswers: CannedAnswer[] = [
  {
    match: ["latest approved policy", "summarize our latest", "latest policy", "summarize"],
    content:
      "The most recently approved policy is the **Data Retention Policy (v1.2)**, registered on-chain on 28 Oct 2026. It defines retention periods per record type, requires secure disposal once a period lapses, and adds a GDPR-alignment section introduced in this version. Financial records are kept for 7 years; routine operational logs for 12 months unless under legal hold.",
    citations: [
      {
        documentId: "DOC-1042",
        documentName: "Data_Retention_Policy.pdf",
        version: "1.2",
        hash: "0x9f2c1a7e4b8d60f3a1c5e9b27d4f8a0c6e3b1d9f2a4c7e0b85d1f6a3c9e2b7d04",
        status: "verified",
        excerpt:
          "Records shall be retained for the period specified in the retention schedule and disposed of securely thereafter.",
      },
    ],
  },
  {
    match: ["modified", "what documents have been", "tampered", "altered"],
    content:
      "Two documents currently fail verification — their recomputed SHA-256 hashes no longer match their on-chain records:\n\n- **Incident_Response_Plan.docx (v2.1)**\n- **Information_Security_Policy.txt (v2.3)**\n\nTreat answers citing these as provisional until the sources are re-approved and re-registered.",
    citations: [
      {
        documentId: "DOC-1031",
        documentName: "Incident_Response_Plan.docx",
        version: "2.1",
        hash: "0xc6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8",
        status: "modified",
        excerpt: "All suspected incidents must be escalated within one hour of detection.",
      },
      {
        documentId: "DOC-1013",
        documentName: "Information_Security_Policy.txt",
        version: "2.3",
        hash: "0xa4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9",
        status: "modified",
        excerpt: "Acceptable use of company systems extends to all remote and personal devices.",
      },
    ],
  },
  {
    match: ["compliance", "regulatory", "gdpr", "legal"],
    content:
      "Several approved sources relate to compliance. The **Privacy Notice for Customers (v2.0)** describes lawful collection and use of personal data, and the **Vendor Master Agreement (v1.0)** sets contractual data-protection obligations and SLAs for third parties. Both are verified against their on-chain records.",
    citations: [
      {
        documentId: "DOC-0994",
        documentName: "Privacy_Notice_Customers.pdf",
        version: "2.0",
        hash: "0xd1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9a4c7e05b8",
        status: "verified",
        excerpt: "We collect and process personal data only on a lawful basis and for stated purposes.",
      },
      {
        documentId: "DOC-1025",
        documentName: "Vendor_Master_Agreement.pdf",
        version: "1.0",
        hash: "0x70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b",
        status: "verified",
        excerpt: "The vendor shall implement appropriate technical and organizational data-protection measures.",
      },
    ],
  },
  {
    match: ["data retention", "retention policy", "retention", "retention requirements"],
    content:
      "According to the approved Data Retention Policy, organizational records must be retained according to their designated retention periods, after which they are securely disposed of. Financial records are kept for 7 years, while routine operational logs are retained for 12 months unless subject to a legal hold.",
    citations: [
      {
        documentId: "DOC-1042",
        documentName: "Data_Retention_Policy.pdf",
        version: "1.2",
        hash: "0x9f2c1a7e4b8d60f3a1c5e9b27d4f8a0c6e3b1d9f2a4c7e0b85d1f6a3c9e2b7d04",
        status: "verified",
        excerpt:
          "Records shall be retained for the period specified in the retention schedule and disposed of securely thereafter.",
      },
    ],
  },
  {
    match: ["security incident", "incident", "breach", "respond"],
    content:
      "Based on the Incident Response Plan, a suspected security incident must be reported to the security team within 1 hour of detection. The response follows four phases: identification, containment, eradication, and recovery, with a post-incident review required within 5 business days.\n\nNote: the cited source for this answer could not be verified against its blockchain record — review before relying on it.",
    citations: [
      {
        documentId: "DOC-1031",
        documentName: "Incident_Response_Plan.docx",
        version: "2.1",
        hash: "0xc6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8",
        status: "modified",
        excerpt:
          "All suspected incidents must be escalated to the Security Operations team within one hour of detection.",
      },
    ],
  },
  {
    match: ["expense", "reimbursement", "claim"],
    content:
      "Per the Expense Reimbursement Guidelines, business expenses must be submitted within 30 days with itemized receipts. Meals are capped at the daily per-diem limit, and any single expense above the approval threshold requires manager sign-off before reimbursement.",
    citations: [
      {
        documentId: "DOC-1007",
        documentName: "Expense_Reimbursement_Guidelines.docx",
        version: "1.4",
        hash: "0x135ecf927b4d0a8c6e3f1b2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60",
        status: "verified",
        excerpt:
          "Claims must be submitted within 30 days accompanied by itemized receipts.",
      },
    ],
  },
  {
    match: ["remote", "conduct", "code of conduct", "behavior"],
    content:
      "The Employee Code of Conduct now includes a remote-work section. Employees working remotely must maintain the same professional standards, protect confidential information on home networks, and remain reachable during agreed core hours. The guidance cross-references the Information Security Policy for acceptable-use rules.",
    citations: [
      {
        documentId: "DOC-1038",
        documentName: "Employee_Code_of_Conduct.pdf",
        version: "3.0",
        hash: "0x2d9a4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b",
        status: "verified",
        excerpt:
          "Remote employees are expected to uphold the same standards of professionalism and confidentiality.",
      },
      {
        documentId: "DOC-1013",
        documentName: "Information_Security_Policy.txt",
        version: "2.3",
        hash: "0xa4c7e05b8d1f6a3c9e2b70d3a1f9c7e2b4d8a60135ecf927b4d0a8c6e3f1b2d9",
        status: "modified",
        excerpt:
          "Acceptable use of company systems extends to all remote and personal devices used for work.",
      },
    ],
  },
];

export const defaultAnswer = {
  content:
    "I can answer questions grounded in the organization's approved documents. I couldn't find a strong match for that query in the current knowledge base, so I don't have a cited source to verify. Try one of the suggested questions, or rephrase using terms from a known policy or SOP.",
  citations: [],
};

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "Data retention policy",
    createdAt: "2026-11-01T14:00:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "What is the company's data retention policy?",
        timestamp: "2026-11-01T14:01:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "According to the approved Data Retention Policy, organizational records must be retained according to their designated retention periods, after which they are securely disposed of. Financial records are kept for 7 years, while routine operational logs are retained for 12 months unless subject to a legal hold.",
        timestamp: "2026-11-01T14:01:05Z",
        citations: [
          {
            documentId: "DOC-1042",
            documentName: "Data_Retention_Policy.pdf",
            version: "1.2",
            hash: "0x9f2c1a7e4b8d60f3a1c5e9b27d4f8a0c6e3b1d9f2a4c7e0b85d1f6a3c9e2b7d04",
            status: "verified",
            excerpt:
              "Records shall be retained for the period specified in the retention schedule.",
          },
        ],
      },
    ],
  },
  {
    id: "conv-2",
    title: "Incident response steps",
    createdAt: "2026-10-31T10:30:00Z",
    messages: [
      {
        id: "m3",
        role: "user",
        content: "How do we handle a security incident?",
        timestamp: "2026-10-31T10:30:00Z",
      },
    ],
  },
  {
    id: "conv-3",
    title: "Expense claim limits",
    createdAt: "2026-10-29T09:15:00Z",
    messages: [],
  },
];
