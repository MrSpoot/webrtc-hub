"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ChatArea() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du message
    console.log("Message envoyé:", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages seront affichés ici */}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 mr-2"
          />
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
    </div>
  );
}
