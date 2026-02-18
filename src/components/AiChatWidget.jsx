import { Bot, Send, Maximize2, Sparkles, X, ArrowDownAZIcon, ArrowDown } from "lucide-react";
import { useState } from "react";

const quickPrompts = [
    "India next series ?",
    "Afghanistan next series ?",
    "New Zealand next series ?",
    "South Africa next series ?",
    "Sri Lanka next series ?",
    "Austrila next series ?",
    "England next series ?",
    "West Indies next series ?"
];

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([
        {
            id : "1",
            role: "assistant",
            content: "Hello! I'm your Ai assistent. Ask me any International cricket teams series schedule..."
        },
    ])

    const handleSend = () =>{
        if(!input.trim()) return;

        const userMessage = {
            id : Date.now().toString(),
            role : "user",
            content : input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        setTimeout (() =>{
            const aiMessage = {
                id : (Date.now() + 1).toString(),
                role: "assistant",
                content: getAIResponse(input),
            };
            setMessages((prev) => [...prev, aiMessage])
        }, 2000)

    };

    const getAIResponse = (query ) => {
        const q = query.toLowerCase();
        if(q.includes("india" || "ind")){
            return "India currently playing in the T20 World Cup 2026(hosted by India & Sri Lanka).\n\nThe next scheduled matches for India is bitateral seires : India tour of England in july 2026";

        }
        if(q.includes("england" || "eng")){
            return "England currently playing in the T20 World Cup 2026(hosted by India & Sri Lanka).\n\nThe next scheduled matches for England is bitateral series : India tour of England in july 2026";        
          }
        if(q.includes("austrlia" || "aus") ){
            return "Austrila currently playing in the T20 World Cup 2026(hosted by India & Sri Lanka).\n\nThe next scheduled matches for austrila is currently unavailble";        
          }
        if(q.includes("sri lanka" || "sl") ){
            return "Sri Lanka currently playing in the T20 World Cup 2026(hosted by India & Sri Lanka).\n\nThe next scheduled matches for Sri Lanka is bitatral series : England tour of Sri Lanka in sept 2026";        
        }
        if(q.includes("new zealand" || "nl") ){
            return "New Zealand currently playing in the T20 World Cup 2026(hosted by India & Sri Lanka).\n\nThe next scheduled matches for New Zealand is bitateral series : South Africa tour of New Zealand in Mar 2026";        
          }
        if(q.includes("south africa" || "sa") ){
            return "South Africa currently playing in the T20 World Cup 2026(hosted by India & Sri Lanka).\n\nThe next scheduled matches for South Africa is bitateral series : South Africa tour of New Zealand in Mar 2026";        
          }
        if(q.includes("west indies" || "wi") ){
            return "West Indies currently playing in the T20 World Cup 2026(hosted by India & Sri Lanka).\n\nThe next scheduled matches for West Indies is currently unavailble";        
          }
        if(q.includes("afghanistan") ){
          return "Afghanistan currently played in the T20 World Cup 2026(hosted by India & Sri Lanka).\n\nThe next scheduled matches for Afghanistan is currently unavailble";        
        }
          return "My brain is tried. Try again later";
        
  };

  if (!isOpen) {
    return (
      <>
      <div
        className="fixed z-999 animate-bounce bottom-25 right-6 flex py-2 px-5 items-center justify-center gap-x-3 rounded-b-xl rounded-l-xl bg-gray-300 text-slate-800">
        <span><Bot className="h-10 w-10 bg-blue-500 rounded-full p-2"/></span>Ai Assistant <ArrowDown/>
      </div>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-999  bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-radial from-yellow-600 via-yellow-600 to-orange-700 text-slate-200 shadow-[0px_0px_12px_-1px_rgba(0,0,0,0.25)] transition-transform hover:scale-110 hover:shadow-[0px_0px_20px_-1px_rgba(0,0,0,0.35)] shadow-amber-600 active:scale-95"
        >
          <Bot className="h-8 w-8" />
        </button>

      </>
      
    );
  }

  return (
    <div
      className={
        `fixed bottom-6 right-6 z-999 flex flex-col rounded-2xl border border-slate-200 bg-radial dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 my-4 dark:text-white from-slate-50 via-stone-200 to-gray-300 transition-all duration-300
        ${isExpanded ? "h-165 w-115" : "h-145 w-95"}`
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b text-white border-gray-400 bg-linear-to-r from-blue-500 to-indigo-500 rounded-t-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border">
            <Sparkles className="h-5 w-5 " />
          </div>
          <div>
            <h3 className="font-semibold text-gray-200">AI Assistant</h3>
            <p className="text-xs text-gray-300">
              Powered by smart analytics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-2 text-stone-100 transition-colors duration-200  hover:bg-gray-500/10"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-stone-100 transition-colors duration-200  hover:bg-gray-500/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              `flex
              ${message.role === "user" ? "justify-end" : "justify-start"}`
            }
          >
            <div
              className={
                `max-w-[85%] rounded-2xl px-4 py-2.5 border border-gray-400/90 dark:border-gray-500 text-sm",
                ${message.role === "user"
                  ? "bg-gray-500/70  text-gray-100"
                  : "bg-gray-400/60 dark:bg-gray-700 text-gray-700 dark:text-gray-200 "}`
              }
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      {messages.length <= 12 && (
        <div className="flex flex-wrap gap-2 border-t border-gray-400 p-3">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="rounded-full bg-gray-500/30 px-3 py-1.5 text-xs font-medium text-gray-900/90 dark:text-neutral-200 transition-colors hover:bg-accent/80"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-400 p-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your finances..."
            className="flex-1 border dark:border-slate-600 border-slate-400 px-3 py-2 rounded-xl text-gray-800 dark:text-slate-300"
          />
          <button onClick={handleSend} className="p-2 w-10 flex items-center justify-centertext-white bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl">
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}