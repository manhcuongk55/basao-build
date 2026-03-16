"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: number;
  from: "buyer" | "supplier";
  name: string;
  text: string;
  time: string;
  read: boolean;
}

interface Chat {
  id: string;
  supplierName: string;
  supplierLogo: string;
  lastMsg: string;
  lastTime: string;
  unread: number;
  project: string;
  messages: Message[];
}

const MOCK_CHATS: Chat[] = [
  {
    id: "c1", supplierName: "TQ Building Direct", supplierLogo: "🏭", lastMsg: "Giá gạch 60×60 hiện tại 172,000đ cho đơn 200m² trở lên", lastTime: "14:30", unread: 2, project: "Nhà phố Q.7",
    messages: [
      { id: 1, from: "buyer", name: "Bạn", text: "Chào anh, tôi cần báo giá gạch Foshan 60×60 cho 200m² được không?", time: "14:10", read: true },
      { id: 2, from: "supplier", name: "TQ Building Direct", text: "Chào anh! Gạch 60×60 Foshan Premium hiện tại giá 180,000đ/m². Cho đơn 200m² trở lên em giảm còn 172,000đ/m².", time: "14:15", read: true },
      { id: 3, from: "buyer", name: "Bạn", text: "Thời gian giao hàng bao lâu? Tôi ở Q.7 TP.HCM", time: "14:20", read: true },
      { id: 4, from: "supplier", name: "TQ Building Direct", text: "Giao tận công trình 12 ngày qua Cainiao. Đóng gói pallet gỗ. Basao Escrow giữ cọc 30% an toàn cho anh.", time: "14:25", read: true },
      { id: 5, from: "supplier", name: "TQ Building Direct", text: "Giá gạch 60×60 hiện tại 172,000đ cho đơn 200m² trở lên. Anh cần em lên đơn không?", time: "14:30", read: false },
    ],
  },
  {
    id: "c2", supplierName: "Nội Thất Hòa Phát", supplierLogo: "🪑", lastMsg: "Tủ bếp gỗ MDF đang có KM giảm 12%", lastTime: "Hôm qua", unread: 0, project: "Biệt thự Thảo Điền",
    messages: [
      { id: 1, from: "buyer", name: "Bạn", text: "Cho tôi xem catalog tủ bếp MDF và giá nhé", time: "09:00", read: true },
      { id: 2, from: "supplier", name: "Hòa Phát", text: "Dạ anh. Tủ bếp gỗ MDF phủ Melamine hiện 5,200,000đ/bộ. Đang có KM giảm 12% cho đơn 3 bộ trở lên.", time: "09:30", read: true },
      { id: 3, from: "supplier", name: "Hòa Phát", text: "Tủ bếp gỗ MDF đang có KM giảm 12%. Hạn đến 31/03.", time: "hôm qua", read: true },
    ],
  },
  {
    id: "c3", supplierName: "Kim Khí Việt Tiệp", supplierLogo: "🔩", lastMsg: "Khóa cửa tay gạt inox 304 có sẵn 500 bộ", lastTime: "2 ngày", unread: 1, project: "Nhà cấp 4 Long An",
    messages: [
      { id: 1, from: "buyer", name: "Bạn", text: "Anh ơi có khóa cửa inox 304 tay gạt không? Cần 50 bộ", time: "10:00", read: true },
      { id: 2, from: "supplier", name: "Việt Tiệp", text: "Khóa cửa tay gạt inox 304 có sẵn 500 bộ. Giá 185,000đ/bộ, SL 50+ giảm 10%.", time: "10:30", read: false },
    ],
  },
];

export default function MessagesPage() {
  const [chats] = useState(MOCK_CHATS);
  const [activeChat, setActiveChat] = useState<string>("c1");
  const [newMsg, setNewMsg] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>(() => {
    const m: Record<string, Message[]> = {};
    MOCK_CHATS.forEach(c => { m[c.id] = c.messages; });
    return m;
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(c => c.id === activeChat)!;
  const messages = localMessages[activeChat] || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!newMsg.trim()) return;
    const msg: Message = {
      id: Date.now(), from: "buyer", name: "Bạn",
      text: newMsg, time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };
    setLocalMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), msg] }));
    setNewMsg("");
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      {/* Chat list sidebar */}
      <div className="w-80 border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <h1 className="font-bold text-sm">💬 Tin nhắn</h1>
          <div className="text-[10px] text-slate-500 mt-1">{chats.reduce((s, c) => s + c.unread, 0)} chưa đọc</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <button key={chat.id} onClick={() => setActiveChat(chat.id)}
              className={`w-full text-left p-4 border-b border-white/[0.03] transition-all ${activeChat === chat.id ? "bg-blue-500/5 border-l-2 border-l-blue-500" : "hover:bg-white/[0.02]"}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{chat.supplierLogo}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-white truncate">{chat.supplierName}</span>
                    <span className="text-[10px] text-slate-500 ml-2 flex-shrink-0">{chat.lastTime}</span>
                  </div>
                  <div className="text-[10px] text-blue-400 mb-0.5">{chat.project}</div>
                  <div className="text-xs text-slate-500 truncate">{chat.lastMsg}</div>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-1">{chat.unread}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="h-14 px-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-xl">{currentChat.supplierLogo}</span>
            <div>
              <div className="font-bold text-sm text-white">{currentChat.supplierName}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Online · {currentChat.project}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/order" className="premium-button py-1.5 px-4 text-xs">Đặt hàng →</Link>
            <Link href={`/products/p1`} className="py-1.5 px-4 border border-white/10 rounded-full text-xs text-slate-400 hover:text-white hover:bg-white/5">Xem SP</Link>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === "buyer" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${msg.from === "buyer" ? "bg-blue-600 rounded-2xl rounded-br-md" : "glass-card"} px-4 py-3`}>
                <div className="text-sm text-white leading-relaxed">{msg.text}</div>
                <div className="text-[10px] text-slate-400 mt-1 text-right flex items-center justify-end gap-1">
                  {msg.time}
                  {msg.from === "buyer" && <span className="text-blue-300">{msg.read ? "✓✓" : "✓"}</span>}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick actions */}
        <div className="px-6 py-1 flex gap-2">
          {["Xin báo giá", "Thời gian giao?", "Có giảm giá không?", "Gửi hợp đồng"].map(q => (
            <button key={q} onClick={() => setNewMsg(q)} className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-slate-500 hover:text-white hover:bg-white/5 transition-all">{q}</button>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/5 flex gap-3">
          <input value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Nhập tin nhắn..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
          <button onClick={sendMessage} className="premium-button px-6 py-3 text-sm">Gửi</button>
        </div>
      </div>
    </div>
  );
}
