"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  Send,
  GraduationCap,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { ChatMessageItem } from "@/hooks/useSchoolChatbot";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { QuickQuestions } from "./QuickQuestions";

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessageItem[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onSelectQuickQuestion: (question: string) => void;
  onClearChat: () => void;
}

export function ChatbotWindow({
  isOpen,
  onClose,
  messages,
  isTyping,
  onSendMessage,
  onSelectQuickQuestion,
  onClearChat,
}: ChatbotWindowProps) {
  const [inputValue, setInputValue] = useState("");
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleBannerVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<{ visible: boolean }>;
      if (customEvent.detail !== undefined) {
        setCookieBannerOpen(Boolean(customEvent.detail.visible));
      } else if (typeof document !== "undefined") {
        setCookieBannerOpen(
          document.documentElement.getAttribute("data-cookie-banner-open") === "true"
        );
      }
    };

    if (typeof document !== "undefined") {
      setCookieBannerOpen(
        document.documentElement.getAttribute("data-cookie-banner-open") === "true"
      );
    }

    window.addEventListener("cookie-banner-visibility", handleBannerVisibility);
    return () => {
      window.removeEventListener("cookie-banner-visibility", handleBannerVisibility);
    };
  }, []);

  // Auto-scroll to bottom when messages update or typing starts
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input when opened
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages, isTyping]);

  // Handle keyboard shortcuts (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="LAX360 School Assistant"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24, scale: 0.95 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 20, scale: 0.96 }
          }
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[390px] h-[520px] sm:h-[570px] max-h-[calc(100vh-160px)] bg-[#FCFBF7] rounded-3xl border border-[#EAE3D7] shadow-2xl shadow-slate-950/20 flex flex-col overflow-hidden text-slate-800 transition-all duration-300 ${
            cookieBannerOpen
              ? "bottom-[356px] sm:bottom-[266px] lg:bottom-[164px]"
              : "bottom-[144px] sm:bottom-[164px]"
          }`}
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div className="leading-tight">
                <h3 className="font-serif font-bold text-sm tracking-wide text-white">
                  LAX360 School Assistant
                </h3>
                <p className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Interactive Guidance Desk</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onClearChat}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Close assistant"
                aria-label="Close assistant"
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden space-y-2">
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onSelectSuggestion={onSelectQuickQuestion}
                isLatest={index === messages.length - 1}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Strip */}
          <QuickQuestions
            onSelect={onSelectQuickQuestion}
            disabled={isTyping}
          />

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-[#EAE3D7] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about our school..."
              disabled={isTyping}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#EAE3D7] bg-[#FAF8F5] text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white flex items-center justify-center shrink-0 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
