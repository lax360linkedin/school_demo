"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  matchUserQuery,
  ROUTE_AWARE_PROMPTS,
  ChatbotResponse,
} from "@/data/schoolChatbotData";

export interface ChatMessageItem {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  actionLink?: {
    label: string;
    href: string;
  };
  suggestedQuestions?: string[];
}

const STORAGE_KEY_HISTORY = "lax360_chat_history";
const STORAGE_KEY_TOOLTIP_SEEN = "lax360_chatbot_seen";

export function useSchoolChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasSeenTooltip, setHasSeenTooltip] = useState<boolean>(true); // default true until checked

  // 1. Initial Load & History Restoration
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user has seen tooltip
    try {
      const seen = localStorage.getItem(STORAGE_KEY_TOOLTIP_SEEN);
      if (!seen) {
        setHasSeenTooltip(false);
      } else {
        setHasSeenTooltip(true);
      }
    } catch {
      setHasSeenTooltip(true);
    }

    // Load message history from localStorage
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) {
        const parsed: ChatMessageItem[] = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not load chat history", err);
    }

    // If no previous history, generate initial welcome message
    initWelcomeMessage();
  }, []);

  // Initialize Welcome Message
  const initWelcomeMessage = useCallback(() => {
    const routeNote =
      ROUTE_AWARE_PROMPTS[pathname] ||
      ROUTE_AWARE_PROMPTS["/"] ||
      "How can I help you explore our school?";

    const welcomeMsg: ChatMessageItem = {
      id: `msg-${Date.now()}`,
      sender: "assistant",
      text: `Hello and welcome to LAX360 Academy.\n\n${routeNote}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      suggestedQuestions: [
        "Tell me about LAX360",
        "Explore our programs",
        "How does admission work?",
        "What facilities do you have?",
      ],
    };
    setMessages([welcomeMsg]);
  }, [pathname]);

  // Persist messages when updated
  const saveHistory = useCallback((newMessages: ChatMessageItem[]) => {
    setMessages(newMessages);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(newMessages));
      } catch (e) {
        console.warn("Error saving chat history", e);
      }
    }
  }, []);

  // Send a user message
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: ChatMessageItem = {
        id: `user-${Date.now()}`,
        sender: "user",
        text: trimmed,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedWithUser = [...messages, userMsg];
      saveHistory(updatedWithUser);
      setIsTyping(true);

      // Simulate short frontend typing delay (350-500ms)
      const timer = setTimeout(() => {
        const response: ChatbotResponse = matchUserQuery(trimmed, pathname);

        const botMsg: ChatMessageItem = {
          id: `bot-${Date.now()}`,
          sender: "assistant",
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          actionLink: response.actionLink,
          suggestedQuestions: response.suggestedQuestions,
        };

        saveHistory([...updatedWithUser, botMsg]);
        setIsTyping(false);
      }, 420);

      return () => clearTimeout(timer);
    },
    [isTyping, messages, pathname, saveHistory]
  );

  // Quick Question handler
  const handleQuickQuestion = useCallback(
    (questionText: string) => {
      sendMessage(questionText);
    },
    [sendMessage]
  );

  // Clear Chat history
  const clearChat = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY_HISTORY);
      } catch (e) {
        console.warn(e);
      }
    }
    initWelcomeMessage();
  }, [initWelcomeMessage]);

  // Toggle open
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasSeenTooltip) {
        dismissTooltip();
      }
      return next;
    });
  }, [hasSeenTooltip]);

  // Dismiss tooltip
  const dismissTooltip = useCallback(() => {
    setHasSeenTooltip(true);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_TOOLTIP_SEEN, "true");
      } catch (e) {
        console.warn(e);
      }
    }
  }, []);

  return {
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
  };
}
