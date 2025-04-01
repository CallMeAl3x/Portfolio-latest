import React, { useState } from "react";
import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";
import { sendMessage } from "@/actions/chat";
import { ChatBotIcon } from "./ChatBotIcon";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatCompletionStreamRequestMessages[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const response = await sendMessage(messages, userInput);
    if (response.error) {
      setError(response.error);
    } else {
      setMessages(response.messages as ChatCompletionStreamRequestMessages[]);
      setUserInput("");
      setError(null);
    }
  };

  if (!showChat) {
    return <ChatBotIcon onClick={() => setShowChat(true)} />;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>ChatBot</h1>
      <ChatContent messages={messages} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "1rem" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "0.5rem"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

const ChatContent: React.FC<{ messages: ChatCompletionStreamRequestMessages[] }> = ({ messages }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "1rem",
        height: "400px",
        overflowY: "auto",
        backgroundColor: "#f9f9f9"
      }}
    >
      {messages.length === 0 ? (
        <p>No messages yet. Start the conversation!</p>
      ) : (
        messages.map((message, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <strong>{message.role === "user" ? "You" : "Assistant"}:</strong>
            <p style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap" }}>{String(message.content)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatBot;
