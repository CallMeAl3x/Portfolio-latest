import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";
import React from "react";
import { SubmitButton } from "./SubmitButton";

interface ChatInterfaceProps {
  messages: ChatCompletionStreamRequestMessages[];
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, userInput, setUserInput, handleSubmit }) => {
  return (
    <>
      <div className="chat-content flex-1 space-y-4 overflow-y-auto bg-[#f9f9f9] p-4">
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
      </div>
      <SubmitButton handleSubmit={handleSubmit} userInput={userInput} setUserInput={setUserInput} />
    </>
  );
};

export default ChatInterface;
