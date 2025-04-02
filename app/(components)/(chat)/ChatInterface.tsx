import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";
import React, { useEffect } from "react";
import { SubmitButton } from "./SubmitButton";
import { LoaderIcon } from "lucide-react";

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

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, messagesEndRef]);

  return (
    <>
      <div className="chat-content h-full flex-1 space-y-4 overflow-y-auto bg-[#f9f9f9] p-4">
        {messages.length === 0 ? (
          <p className="text-black"></p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 text-black ${
                  message.role === "user" ? "bg-accent text-white shadow-sm" : "bg-gray-100 text-gray-800 shadow-sm"
                }`}
              >
                {String(message.content)}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg bg-gray-100 p-3 text-gray-800 shadow-sm">
              <LoaderIcon size={18} className="spin transform" />
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
