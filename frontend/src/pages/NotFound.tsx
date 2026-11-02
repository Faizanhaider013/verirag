import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <Logo size={44} />
      <div>
        <p className="font-display text-4xl font-semibold tracking-tight text-graphite">
          Page not found
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          This page doesn't exist in the VeriRAG prototype. Let's get you back to
          your workspace.
        </p>
      </div>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
