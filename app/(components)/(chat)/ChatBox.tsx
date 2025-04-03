import { sendMessage } from "@/actions/chat";
import useIsMobile from "@/app/(utils)/userDevice";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components";
import { Expand, Minimize, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { ChatBotIcon } from "./ChatBotIcon";
import ChatInterface from "./ChatInterface";

const CHAT_STORAGE_KEY = "chatMessages";
const CHAT_ERROR_KEY = "chatError";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatCompletionStreamRequestMessages[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [showChat, setShowChat] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResizing, setIsResizing] = useState(false); // new state for resizing
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("About.chatbot");
  const [error, setError] = useState<{ message: string; isRateLimited?: boolean } | null>(null);

  useEffect(() => {
    // Load messages from localStorage on component mount
    const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    const storedError = localStorage.getItem(CHAT_ERROR_KEY);
    if (storedError) {
      setError(JSON.parse(storedError));
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage whenever messages change
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    // Save error to localStorage whenever error changes
    localStorage.setItem(CHAT_ERROR_KEY, JSON.stringify(error));
  }, [error]);

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
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOutsideClick = React.useCallback(
    (event: MouseEvent) => {
      if (isResizing) return; // ignore clicks during resizing
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target as Node) && !isMobile) {
        setShowChat(false);
        setIsExpanded(false);
      }
    },
    [chatBoxRef, isMobile, isResizing]
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
      <div className="relative font-poppins-bold md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <ChatBotIcon />
          </DrawerTrigger>
          <DrawerContent className="fixed inset-x-0 bottom-0 h-[80lvh] rounded-t-xl border-t border-gray-200 bg-white">
            <DrawerHeader className="border-b bg-white px-6">
              <div className="flex items-center justify-between">
                <DrawerTitle className="font-poppins-regular text-lg text-gray-900">{t("title")}</DrawerTitle>
                <DrawerClose className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                  <Minus size={20} />
                </DrawerClose>
              </div>
            </DrawerHeader>
            <ChatInterface
              messages={messages}
              ref={messagesEndRef}
              userInput={userInput}
              setUserInput={setUserInput}
              handleSubmit={handleSubmit}
              error={error}
            />
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop ChatBot Icon */}
      <div className="relative hidden h-screen md:block">
        {isExpanded ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <div ref={chatBoxRef} className="flex h-[85vh] w-[70vw] flex-col rounded-xl bg-white shadow-2xl">
              <div className="flex items-center justify-between rounded-t-xl border-b bg-white p-6">
                <h3 className="font-poppins-bold text-xl text-gray-900">{t("title")}</h3>
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
                error={error}
              />
            </div>
          </div>
        ) : (
          <Rnd
            default={{ x: -360, y: window.innerHeight - 384 - 20, width: 320, height: 384 }}
            minWidth={320}
            minHeight={240}
            bounds="window"
            lockAspectRatio={true}
            onResizeStart={() => setIsResizing(true)}
            onResizeStop={() => setIsResizing(false)}
            dragHandleClassName="drag-handle"
          >
            <div
              ref={chatBoxRef}
              className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
            >
              {!showChat && <ChatBotIcon onClick={() => setShowChat(false)} />}
              <div className="drag-handle flex cursor-move items-center justify-between rounded-t-xl border-b-[0.5px] border-black/40 bg-white p-4">
                <h3 className="font-poppins-reg text-gray-900">{t("title")}</h3>
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
                error={error}
              />
            </div>
          </Rnd>
        )}
      </div>
    </>
  );
};

export default ChatBot;
