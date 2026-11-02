import { useCallback, useRef, useState } from "react";

/**
 * Copy text to the clipboard and expose a transient "copied" flag per key.
 * Works with a graceful fallback when the Clipboard API is unavailable.
 */
export function useCopyToClipboard(resetMs = 1500) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string, key?: string) => {
      const id = key ?? text;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setCopiedKey(id);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopiedKey(null), resetMs);
        return true;
      } catch {
        return false;
      }
    },
    [resetMs],
  );

  return { copy, copiedKey };
}
