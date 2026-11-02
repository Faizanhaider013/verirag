import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Send,
  Copy,
  RotateCcw,
  Check,
  History,
  Plus,
  ShieldCheck,
  MessageSquareText,
} from "lucide-react";
import SourceCard from "@/components/ask/SourceCard";
import SourceInspector from "@/components/ask/SourceInspector";
import MarkdownLite from "@/components/common/MarkdownLite";
import Drawer from "@/components/common/Drawer";
import Logo from "@/components/common/Logo";
import { askQuestion } from "@/services/mockApi";
import { mockConversations, suggestedQuestions } from "@/data/mockChats";
import type { ChatMessage, Citation, Conversation } from "@/types";
import { cn } from "@/utils/format";

let seq = 500;
const nextId = () => `m-${seq++}`;

function freshConversation(): Conversation {
  return {
    id: `conv-${seq++}`,
    title: "New conversation",
    createdAt: new Date().toISOString(),
    messages: [],
  };
}

export default function AskAI() {
  const [conversations, setConversations] = useState<Conversation[]>(() => [
    freshConversation(),
    ...mockConversations,
  ]);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Citation | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const streamTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didInit = useRef(false);

  const active =
    conversations.find((c) => c.id === activeId) ?? conversations[0];
  const messages = active.messages;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking, streamingId]);

  useEffect(() => () => {
    if (streamTimer.current) clearTimeout(streamTimer.current);
  }, []);

  // Accept an initial question handed over from the Home ask box (?q=…).
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !didInit.current) {
      didInit.current = true;
      setSearchParams({}, { replace: true });
      send(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function patchActive(updater: (c: Conversation) => Conversation) {
    setConversations((prev) =>
      prev.map((c) => (c.id === active.id ? updater(c) : c)),
    );
  }

  function setMessageContent(id: string, content: string) {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === id ? { ...m, content } : m,
              ),
            }
          : c,
      ),
    );
  }

  function streamIn(reply: ChatMessage) {
    patchActive((c) => ({
      ...c,
      messages: [...c.messages, { ...reply, content: "" }],
    }));
    setStreamingId(reply.id);
    const full = reply.content;
    const stepSize = Math.max(2, Math.round(full.length / 90));
    let i = 0;
    const tick = () => {
      i += stepSize;
      setMessageContent(reply.id, full.slice(0, i));
      if (i < full.length) {
        streamTimer.current = setTimeout(tick, 18);
      } else {
        setMessageContent(reply.id, full);
        setStreamingId(null);
      }
    };
    tick();
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || thinking || streamingId) return;
    setInput("");
    const userMsg: ChatMessage = {
      id: nextId(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    patchActive((c) => ({
      ...c,
      title: c.messages.length === 0 ? content.slice(0, 44) : c.title,
      messages: [...c.messages, userMsg],
    }));
    setThinking(true);
    const reply = await askQuestion(content);
    setThinking(false);
    streamIn({ ...reply, id: nextId() });
  }

  function regenerate() {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser && !thinking && !streamingId) send(lastUser.content);
  }

  function copyMessage(m: ChatMessage) {
    navigator.clipboard?.writeText(m.content).catch(() => {});
    setCopiedId(m.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function newChat() {
    const c = freshConversation();
    setConversations((prev) => [c, ...prev]);
    setActiveId(c.id);
    setSelected(null);
  }

  const empty = messages.length === 0 && !thinking;

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversation column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-graphite">Ask AI</p>
              <p className="flex items-center gap-1 text-[11px] text-muted">
                <ShieldCheck className="h-3 w-3 text-emerald" />
                Sources verified individually
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setHistoryOpen(true)}
              className="btn-ghost h-9 rounded-xl px-3 text-sm"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </button>
            <button onClick={newChat} className="btn-secondary h-9 px-3">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 py-6 sm:px-8"
        >
          <div className="mx-auto max-w-3xl">
            {empty ? (
              <div className="flex flex-col items-center py-10 text-center sm:py-16">
                <Logo size={48} />
                <h1 className="mt-6 font-display text-hero font-semibold tracking-tight text-graphite">
                  Ask your knowledge base.
                </h1>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted text-balance">
                  Get intelligent answers grounded in your approved documents.
                  Every cited source comes with an integrity verification status.
                </p>
                <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="group flex items-center gap-2.5 rounded-xl border border-line bg-paper px-4 py-3 text-left text-sm text-graphite transition-all hover:border-[#dcdbd4] hover:shadow-card"
                    >
                      <Sparkles className="h-4 w-4 shrink-0 text-indigo/70" />
                      <span className="flex-1">{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8 pb-4">
                {messages.map((m) => (
                  <MessageBlock
                    key={m.id}
                    message={m}
                    streaming={streamingId === m.id}
                    copied={copiedId === m.id}
                    onCopy={() => copyMessage(m)}
                    onRegenerate={regenerate}
                    onInspect={setSelected}
                    selectedId={selected?.documentId}
                  />
                ))}
                {thinking && <Thinking />}
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-line bg-ivory/60 px-5 py-4 sm:px-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mx-auto max-w-3xl"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-line bg-paper p-2 shadow-subtle transition-shadow focus-within:shadow-ring">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder="Ask anything about your knowledge base…"
                className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-[15px] text-graphite outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking || !!streamingId}
                className="btn-primary h-10 w-10 shrink-0 rounded-xl p-0"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted">
              Prototype · answers are predefined and simulated, not live AI or
              blockchain calls.
            </p>
          </form>
        </div>
      </div>

      {/* Inline inspector (xl+) */}
      {selected && (
        <aside className="hidden w-[384px] shrink-0 animate-slide-in-right border-l border-line bg-paper xl:block">
          <SourceInspector citation={selected} onClose={() => setSelected(null)} />
        </aside>
      )}

      {/* Drawer inspector (below xl) */}
      <div className="xl:hidden">
        <Drawer
          open={!!selected}
          onClose={() => setSelected(null)}
          title="Source inspector"
        >
          {selected && <SourceInspector citation={selected} />}
        </Drawer>
      </div>

      {/* History drawer */}
      <Drawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        title="Conversation history"
      >
        <div className="space-y-1">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveId(c.id);
                setHistoryOpen(false);
                setSelected(null);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                c.id === active.id ? "bg-ivory" : "hover:bg-ivory/70",
              )}
            >
              <MessageSquareText className="h-4 w-4 shrink-0 text-muted" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-graphite">
                  {c.title}
                </span>
                <span className="block text-xs text-muted">
                  {c.messages.length} message
                  {c.messages.length === 1 ? "" : "s"}
                </span>
              </span>
            </button>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

function MessageBlock({
  message,
  streaming,
  copied,
  onCopy,
  onRegenerate,
  onInspect,
  selectedId,
}: {
  message: ChatMessage;
  streaming: boolean;
  copied: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onInspect: (c: Citation) => void;
  selectedId?: string;
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-indigo px-4 py-2.5 text-[15px] leading-relaxed text-white">
          {message.content}
        </div>
      </div>
    );
  }

  const showMeta = !streaming;

  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo text-white">
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[15px]">
          <MarkdownLite text={message.content} />
          {streaming && (
            <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-indigo align-middle" />
          )}
        </div>

        {showMeta && message.citations && message.citations.length > 0 && (
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
              <p className="overline">
                Verified sources · {message.citations.length}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {message.citations.map((c, i) => (
                <div
                  key={c.documentId}
                  className={cn(
                    "rounded-xl transition-shadow",
                    selectedId === c.documentId && "ring-2 ring-indigo/30",
                  )}
                >
                  <SourceCard citation={c} index={i + 1} onInspect={onInspect} />
                </div>
              ))}
            </div>
          </div>
        )}

        {showMeta && (
          <div className="mt-3 flex items-center gap-1">
            <button onClick={onCopy} className="btn-ghost h-8 rounded-lg px-2 text-xs">
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={onRegenerate}
              className="btn-ghost h-8 rounded-lg px-2 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Regenerate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Thinking() {
  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo text-white">
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="flex items-center gap-1.5 pt-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-blink rounded-full bg-muted"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
        <span className="ml-1.5 text-sm text-muted">
          Retrieving &amp; verifying sources…
        </span>
      </div>
    </div>
  );
}
