import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

const SYSTEM_PROMPT = `
You are the dedicated AI assistant for Indraam, a premium creative studio. 
Your ONLY goal is to provide information about Indraam's studio, services, projects, and contact details from the provided website data. 

**STRICT RULES:**
- ONLY answer questions about Indraam. 
- Do NOT provide general knowledge, unrelated facts, or personal opinions. 
- If a question is outside the scope of Indraam's work, politely decline and steer back to our services.
- Always sound premium, professional, and inspiring.

**INDRAAM CORE DATA:**
- **Description**: A US-based premium creative studio crafting ambitious digital experiences.
- **Stats**: 6+ years experience, 48+ delivered projects, 30+ clients worldwide.
- **Philosophy**: We blend strategic thinking with top-tier execution to create premium, intuitive, and memorable experiences.
- **Contact**: hello@indraam.com | +1 (203) 640-2437 | Located in the US.

**SERVICES:**
1. **Strategy**: Digital Transformation, Market Research, Product Strategy, Growth Planning, Brand Positioning.
2. **Design**: Brand Identity, UI/UX Design, Art Direction, Web Design, Print & Editorial.
3. **Development (Dev)**: Frontend Development, Backend & APIs, CMS Integration, E-commerce, Performance Optimization.
4. **Digital Marketing**: SEO, Social Media, Digital Advertising, Content Strategy, Analytics & Reporting.

**FEATURED PROJECTS:**
- **Norwood Gulf**: Auto repair platform & community staple. (Tech: Diagnostics, Engine Performance).
- **LedgerFlow Finance OS**: Finance ops suite for startups. (Tech: React, Node.js, PostgreSQL).
- **Context AI Copilot**: RAG-powered research assistant. (Tech: OpenAI, Python, pgvector).
- **Pulse Commerce Engine**: High-performance commerce frontend. (Tech: Remix, Shopify).
- **Orbit Dev Console**: Infrastructure control plane. (Tech: TypeScript, tRPC, Prisma).
- **Atlas Forecast Studio**: AI-assisted operations planning. (Tech: Vue, FastAPI, Snowflake).

If a user asks about anything not listed above, say: "I'm specialized in Indraam's creative studio work. I can only provide details on our services, projects, and vision. How can I help you with your next digital build?"
`.trim();

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to Indraam. My intelligence was just upgraded with a live brain! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Calling local backend to handle the proxy for security and CORS
      const BACKEND_URL = "http://localhost:3001/api/chat";

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-8b-instruct",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-4).map(m => ({
              role: m.sender === "bot" ? "assistant" : "user",
              content: m.text
            })),
            { role: "user", content: inputValue }
          ],
          temperature: 0.2,
          top_p: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I'm sorry, I'm having a bit of trouble connecting to my brain right now. Please try again or reach out to us at hello@indraam.com.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9995] flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[9999] flex h-[500px] w-[350px] flex-col overflow-hidden rounded-[32px] border border-white/15 bg-[#0a0a0a]/80 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:bottom-8 sm:right-8 sm:w-[380px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <BotAvatar size={24} />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-green-500" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold tracking-tight text-white">Indraam Bot</h3>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-white/40">Online & Ready</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide space-y-4"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "bot" ? -10 : 10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-[20px] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.sender === "bot" 
                        ? "bg-white/5 text-white/90 rounded-bl-none border border-white/5" 
                        : "bg-white text-black rounded-br-none shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="rounded-[20px] bg-white/5 px-4 py-3 border border-white/5 flex gap-1">
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSendMessage}
              className="border-t border-white/10 p-4"
            >
              <div className="relative">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full rounded-full border border-white/10 bg-white/5 py-3.5 pl-5 pr-12 text-[13px] text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95 disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const BotAvatar = ({ size = 24 }: { size?: number }) => {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="text-white"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M12 8V4M12 4L16 6M12 4L8 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.rect
          x="3"
          y="8"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          animate={{
            stroke: ["rgba(255,255,255,1)", "rgba(255,0,127,1)", "rgba(0,245,255,1)", "rgba(255,255,255,1)"]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle 
          cx="8" 
          cy="13" 
          r={1} 
          fill="currentColor"
          animate={{ r: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle 
          cx="16" 
          cy="13" 
          r={1} 
          fill="currentColor"
          animate={{ r: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
};

export default ChatBot;
