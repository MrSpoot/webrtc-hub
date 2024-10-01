"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function BottomBar() {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    console.log(message);
    if (message === "") {
      setMessage("");
    }
  };

  return (
    <div className="flex bg-card items-center p-2">
      <div className="flex rounded-full flex-1 bg-[#1a1a1a] items-center p-2">
        <Button variant={"ghost"} className="rounded-full" size={"icon"}>
          <PlusIcon />
        </Button>
        <Input
          type="text"
          placeholder="Tapez votre message..."
          className="flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
        <Button
          variant={"ghost"}
          className="rounded-full"
          size={"icon"}
          onClick={handleSubmit}
        >
          <PaperPlaneIcon />
        </Button>
      </div>
    </div>
  );
}
