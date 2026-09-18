"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSchoolChatbot } from "@/hooks/useSchoolChatbot";
import { ChatbotButton } from "./ChatbotButton";
import { ChatbotWindow } from "./ChatbotWindow";

export default function SchoolChatbot() {
  const pathname = usePathname();
  const {
    isOpen,
    setIsOpen,
    toggleOpen,
    messages,
    isTyping,
    sendMessage,
    handleQuickQuestion,
    clearChat,
    hasSeenTooltip,
    dismissTooltip,
  } = useSchoolChatbot();

  // Hide on all administrative portal routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <ChatbotButton
        isOpen={isOpen}
        onToggle={toggleOpen}
        hasSeenTooltip={hasSeenTooltip}
        onDismissTooltip={dismissTooltip}
      />
      <ChatbotWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={sendMessage}
        onSelectQuickQuestion={handleQuickQuestion}
        onClearChat={clearChat}
      />
    </>
  );
}
