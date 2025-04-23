
import React, { useRef, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, MessageSquare, Send } from "lucide-react";

type Message = {
  sender: "support" | "user";
  content: string;
  timestamp: string;
};

type SupportChatModalProps = {
  open: boolean;
  onClose: () => void;
  ticket: { id: number, subject: string, party: string, partyName: string };
  messages: Message[];
  onSendMessage: (msg: string) => void;
};

const SupportChatModal: React.FC<SupportChatModalProps> = ({
  open,
  onClose,
  ticket,
  messages,
  onSendMessage,
}) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setInput("");
  }, [open, ticket.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-fade-in">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Chat: {ticket.subject}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {ticket.party}: <strong>{ticket.partyName}</strong>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div
          className="border rounded grow h-60 overflow-y-auto bg-muted px-3 py-2 mb-2"
          ref={scrollRef}
        >
          {messages.length === 0 && (
            <div className="text-sm text-center text-muted-foreground mt-4">
              No messages yet. Start the conversation!
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${msg.sender === "support" ? "justify-end" : "justify-start"}`}
            >
              <div className={`px-3 py-2 rounded-xl max-w-xs text-sm ${msg.sender === "support"
                ? "bg-blue-100 text-blue-700 rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>
                {msg.content}
                <div className="text-[10px] text-gray-400 mt-1 text-right">{msg.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="flex gap-2">
          <Input
            value={input}
            autoFocus
            placeholder="Type a message…"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1"
          />
          <Button type="button" onClick={handleSend} disabled={!input.trim()} variant="default">
            <Send className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupportChatModal;

