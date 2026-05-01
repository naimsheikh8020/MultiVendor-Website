import { useState } from "react";

type User = {
  id: number;
  name: string;
  lastMessage: string;
};

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
};

const users: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  lastMessage: "Last message...",
}));

const VendorMessage = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello 👋", sender: "other" },
    { id: 2, text: "How can I help?", sender: "me" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "me" },
    ]);
    setInput("");
  };

  return (
    <div className="px-4">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">

        {/* Chat List */}
        {!activeUser && (
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setActiveUser(user)}
                className="bg-white p-4 rounded-xl"
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">
                  {user.lastMessage}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Chat Screen */}
        {activeUser && (
          <div className="bg-white rounded-xl flex flex-col h-[85vh]">

            {/* Header */}
            <div className="px-4 py-3 bg-gray-200 flex items-center gap-3">
              <button onClick={() => setActiveUser(null)}>
                ←
              </button>
              <p className="font-semibold">{activeUser.name}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 text-sm max-w-[75%] ${
                      msg.sender === "me"
                        ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                        : "bg-gray-200 text-gray-800 rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-gray-200 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-white rounded-full px-4 py-2 text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden md:flex w-full mx-auto h-[85vh] gap-4">

        {/* Sidebar */}
        <div className="w-72 bg-white rounded-xl flex flex-col">
          <div className="p-4 bg-gray-200 rounded-t-xl font-semibold">
            Messages
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setActiveUser(user)}
                className={`p-3 rounded-lg cursor-pointer ${
                  activeUser?.id === user.id
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 bg-white rounded-xl flex flex-col">
          {activeUser ? (
            <>
              <div className="px-4 py-3 bg-blue-600 rounded-t-xl text-white font-semibold">
                {activeUser.name}
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "me"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 text-sm max-w-[70%] ${
                        msg.sender === "me"
                          ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                          : "bg-gray-200 text-gray-800 rounded-2xl rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-3 bg-gray-100 rounded-b-xl flex gap-2">
                <input
                  value={input}
                  placeholder="Write Your Message"
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-white rounded-full px-4 py-2 text-sm"
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center text-gray-400">
              Select a chat
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorMessage;