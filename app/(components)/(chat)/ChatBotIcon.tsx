import { MessageSquare } from "lucide-react";

interface ChatBotIconProps {
  onClick?: () => void;
}

export function ChatBotIcon({ onClick }: ChatBotIconProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-10 rounded-full bg-accent p-4 text-white shadow-lg transition-colors hover:bg-indigo-700 lg:right-8"
      aria-label="Open chat"
    >
      <MessageSquare />
    </button>
  );
}
