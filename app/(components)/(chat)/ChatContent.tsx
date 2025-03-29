import { type RefObject } from "react";
import { SubmitButton } from "./SubmitButton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  error: string | null;
}

interface ChatContentProps {
  state: ChatState;
  formRef: RefObject<HTMLFormElement>;
  messagesEndRef: RefObject<HTMLDivElement>;
  handleSubmit: (formData: FormData) => Promise<void>;
  isExpanded?: boolean;
}

export function ChatContent({ state, formRef, messagesEndRef, handleSubmit, isExpanded }: ChatContentProps) {
  return (
    <>
      <div className={`flex-1 space-y-4 overflow-y-auto p-4 ${isExpanded ? "px-6" : ""}`}>
        {state.error && <div className="rounded bg-red-100 p-2 text-sm text-red-600">{state.error}</div>}
        {state.messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user" ? "bg-indigo-600 text-white shadow-sm" : "bg-gray-100 text-gray-800 shadow-sm"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form ref={formRef} action={handleSubmit} className={`border-t border-black/40 ${isExpanded ? "p-6" : "p-4"}`}>
        <div className="flex gap-2">
          <input
            type="text"
            name="message"
            placeholder="Type a message..."
            className="font-roboto flex-1 rounded-lg border border-gray-200 p-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
            maxLength={500}
          />
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
