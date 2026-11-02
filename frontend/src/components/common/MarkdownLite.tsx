import { Fragment, type ReactNode } from "react";

/** Render inline **bold** and `code` within a line. */
function inline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(regex);
  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={`${keyBase}-${i}`}>{part.slice(2, -2)}</strong>);
    } else if (part.startsWith("`") && part.endsWith("`")) {
      nodes.push(<code key={`${keyBase}-${i}`}>{part.slice(1, -1)}</code>);
    } else {
      nodes.push(<Fragment key={`${keyBase}-${i}`}>{part}</Fragment>);
    }
  });
  return nodes;
}

/**
 * Minimal, dependency-free Markdown for AI answers:
 * supports paragraphs, **bold**, `code`, and "- " bullet lists.
 */
export default function MarkdownLite({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);

  return (
    <div className="answer">
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const isList = lines.every((l) => l.trim().startsWith("- "));
        if (isList) {
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.trim().slice(2), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        return <p key={bi}>{inline(block, `${bi}`)}</p>;
      })}
    </div>
  );
}
