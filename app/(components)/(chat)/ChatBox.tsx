"use client";
import { sendMessage } from "@/actions/chat";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Expand, Minimize, Minus } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { ChatBotIcon } from "./ChatBotIcon";
import { ChatContent } from "./ChatContent";

export default function ChatBox() {
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    await formAction(formData);
    formRef.current?.reset();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [state, formAction] = useActionState(sendMessage, { messages: [], error: null });

  const chatContent = (
    <ChatContent
      state={state}
      formRef={formRef}
      messagesEndRef={messagesEndRef}
      handleSubmit={handleSubmit}
      isExpanded={isExpanded}
    />
  );

  const handleOutsideClick = (event: MouseEvent) => {
    if (chatBoxRef.current && !chatBoxRef.current.contains(event.target as Node)) {
      setShowChat(false);
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (showChat) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showChat]);

  if (!showChat) {
    return <ChatBotIcon onClick={() => setShowChat(true)} />;
  }

  return (
    <>
      {/* Mobile Drawer - visible only on small screens */}
      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <ChatBotIcon onClick={() => {}} />
          </DrawerTrigger>
          <DrawerContent className="fixed inset-x-0 bottom-0 h-[85vh] rounded-t-xl border-t border-gray-200 bg-white">
            <DrawerHeader className="border-b bg-white px-6">
              <div className="flex items-center justify-between">
                <DrawerTitle className="text-lg font-semibold text-gray-900">Alexandre's assistant</DrawerTitle>
                <DrawerClose className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                  <Minus size={20} />
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="flex h-[calc(85vh-90px)] flex-col bg-white">{chatContent}</div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop Chat - hidden on small screens */}
      <div className="hidden md:block">
        {isExpanded ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <div ref={chatBoxRef} className="flex h-[85vh] w-[70vw] flex-col rounded-xl bg-white shadow-2xl">
              <div className="flex items-center justify-between rounded-t-xl border-b bg-white p-6">
                <h3 className="text-xl font-semibold text-gray-900">Alexandre's assistant</h3>
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
              {chatContent}
            </div>
          </div>
        ) : (
          <div
            ref={chatBoxRef}
            className="absolute bottom-16 right-0 mb-4 flex h-96 w-80 flex-col rounded-xl border border-gray-200 bg-white shadow-xl"
          >
            <ChatBotIcon onClick={() => setShowChat(false)} />

            <div className="flex items-center justify-between rounded-t-xl border-b-[0.5px] border-black/40 bg-white p-4">
              <h3 className="font-semibold text-gray-900">Alexandre's assistant</h3>
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
            {chatContent}
          </div>
        )}
      </div>
    </>
  );
}
