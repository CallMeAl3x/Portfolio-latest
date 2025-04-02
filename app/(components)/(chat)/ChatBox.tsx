import { sendMessage } from "@/actions/chat";
import useIsMobile from "@/app/(utils)/userDevice";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";
import { Expand, Minimize, Minus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ChatBotIcon } from "./ChatBotIcon";
import ChatInterface from "./ChatInterface";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatCompletionStreamRequestMessages[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [showChat, setShowChat] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const response = await sendMessage(messages, userInput);
    if (response.error) {
    } else {
      setMessages(response.messages as ChatCompletionStreamRequestMessages[]);
      setUserInput("");
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOutsideClick = React.useCallback(
    (event: MouseEvent) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target as Node) && !isMobile) {
        setShowChat(false);
        setIsExpanded(false);
      }
    },
    [chatBoxRef, isMobile]
  );

  useEffect(() => {
    if (showChat) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showChat, isMobile, handleOutsideClick]);

  if (!showChat) {
    return <ChatBotIcon onClick={() => setShowChat(true)} />;
  }

  return (
    <>
      <div className="relative md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <ChatBotIcon />
          </DrawerTrigger>
          <DrawerContent className="fixed inset-x-0 bottom-0 h-[85vh] rounded-t-xl border-t border-gray-200 bg-white">
            <DrawerHeader className="border-b bg-white px-6">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-lg font-semibold text-gray-900">Alexandre&apos;s assistant</DrawerTitle>
                <DrawerClose className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                  <Minus size={20} />
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="flex h-[calc(85vh-90px)] flex-col bg-white">
              <ChatInterface
                messages={messages}
                ref={messagesEndRef}
                userInput={userInput}
                setUserInput={setUserInput}
                handleSubmit={handleSubmit}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop ChatBot Icon */}
      <div className="hidden md:block">
        {isExpanded ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <div ref={chatBoxRef} className="flex h-[85vh] w-[70vw] flex-col rounded-xl bg-white shadow-2xl">
              <div className="flex items-center justify-between rounded-t-xl border-b bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900">Alexandre&apos;s assistant</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  >
                    <Minimize size={22} />
                  </button>
                  <button
                    onClick={() => setShowChat(false)}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  >
                    <Minus size={22} />
                  </button>
                </div>
              </div>
              <ChatInterface
                ref={messagesEndRef}
                messages={messages}
                userInput={userInput}
                setUserInput={setUserInput}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        ) : (
          <div
            ref={chatBoxRef}
            className="absolute bottom-16 right-0 mb-4 flex h-96 w-80 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
          >
            <ChatBotIcon onClick={() => setShowChat(false)} />

            <div className="flex items-center justify-between rounded-t-xl border-b-[0.5px] border-black/40 bg-white p-4">
              <h3 className="font-semibold text-gray-900">Alexandre&apos;s assistant</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                >
                  <Expand size={20} />
                </button>
                <button
                  onClick={() => setShowChat(false)}
                  className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                >
                  <Minus size={20} />
                </button>
              </div>
            </div>
            <ChatInterface
              ref={messagesEndRef}
              messages={messages}
              userInput={userInput}
              setUserInput={setUserInput}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
