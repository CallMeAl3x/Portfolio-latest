import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";
import { LoaderIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { SubmitButton } from "./SubmitButton";

interface ChatInterfaceProps {
  messages: ChatCompletionStreamRequestMessages[];
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading?: boolean; // Optional loading prop
  ref?: React.Ref<HTMLDivElement>; // Optional ref prop for forwarding
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  userInput,
  setUserInput,
  handleSubmit,
  isLoading,
  ref
}) => {
  const messagesEndRef = (ref || React.createRef<HTMLDivElement>()) as React.RefObject<HTMLDivElement>; // Ensure ref is used properly
  const t = useTranslations("About.chatbot");

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, messagesEndRef]);

  return (
    <>
      <div className="chat-content h-full flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">
        {messages.length === 0 ? (
          <p className="font-poppins-reg italic text-gray-600">{t("noMessage")}</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-gray-800 shadow-md ${
                  message.role === "user" ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {String(message.content)}
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

      <SubmitButton
        handleSubmit={handleSubmit}
        userInput={userInput}
        setUserInput={setUserInput}
        isLoading={isLoading}
      />
    </>
  );
};

export default ChatInterface;
