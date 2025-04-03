import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";
import { LoaderIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SubmitButton } from "./SubmitButton";

interface ChatInterfaceProps {
  messages: ChatCompletionStreamRequestMessages[];
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  error?: { message: string; isRateLimited?: boolean } | null;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  userInput,
  setUserInput,
  handleSubmit,
  isLoading,
  ref,
  error
}) => {
  const messagesEndRef = (ref || React.createRef<HTMLDivElement>()) as React.RefObject<HTMLDivElement>;
  const t = useTranslations("About.chatbot");
  const th = useTranslations("Error");

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, messagesEndRef]);

  return (
    <>
      <div
        id="chat-interface"
        className="chat-content h-full flex-1 space-y-4 overflow-x-auto overflow-y-auto bg-gray-50 p-4"
      >
        {messages.length === 0 ? (
          <p className="font-poppins-reg italic text-gray-600">{t("noMessage")}</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`mt-4 max-w-[80%] rounded-xl px-3 py-2 text-gray-800 shadow-md ${
                  message.role === "user" ? "bg-accent text-white" : "bg-white"
                }`}
              >
                {/* Utilisation de ReactMarkdown pour rendre le markdown */}
                <div className="prose prose-blue break-words">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{String(message.content)}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-xl bg-white px-3 py-2 text-gray-800 shadow-md">
              <LoaderIcon size={18} className="spin transform" />
              Thinking...
            </div>
          </div>
        )}
        {/* Add a div at the end of the messages list for scrolling */}
        <div ref={messagesEndRef} />
      </div>
      {error ? (
        <>
          <p className="mt-2 bg-transparent text-center text-red-500">{th("rateLimit")}</p>
        </>
      ) : (
        <SubmitButton
          handleSubmit={handleSubmit}
          userInput={userInput}
          setUserInput={setUserInput}
          isLoading={isLoading}
          disabled={false}
        />
      )}
    </>
  );
};

export default ChatInterface;
