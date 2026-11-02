import {
  Home,
  Sparkles,
  Library,
  ShieldCheck,
  Blocks,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    heading: "Workspace",
    items: [
      { label: "Home", to: "/", icon: Home },
      { label: "Ask AI", to: "/ask", icon: Sparkles },
      { label: "Documents", to: "/documents", icon: Library },
    ],
  },
  {
    heading: "Trust & Security",
    items: [
      { label: "Verification", to: "/verification", icon: ShieldCheck },
      { label: "Blockchain Activity", to: "/blockchain", icon: Blocks },
    ],
  },
];

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items);

const titleMap: Record<string, string> = {
  "/": "Home",
  "/ask": "Ask AI",
  "/documents": "Documents",
  "/register": "Register Document",
  "/verification": "Verification",
  "/blockchain": "Blockchain Activity",
  "/settings": "Settings",
};

export function titleForPath(pathname: string): string {
  if (titleMap[pathname]) return titleMap[pathname];
  const match = allNavItems.find(
    (i) => i.to !== "/" && pathname.startsWith(i.to),
  );
  return match?.label ?? "Workspace";
}
