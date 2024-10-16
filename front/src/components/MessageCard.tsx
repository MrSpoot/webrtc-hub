import { useProfile } from "@/services/queries/user-queries";
import { format } from "date-fns";
import { useState } from "react";
import { useUserStore } from "../hooks/use-userStore";
import { Channel, Message } from "../services/canal-service";
import AvatarWithBadge from "./AvatarWithBadge";

interface MessageProps {
  channel?: Channel;
  messages: Message[];
}

export default function MessageCard({ channel, messages }: MessageProps) {
  const { user } = useUserStore();
  const { data: profile } = useProfile(messages[0].senderId);

  function userOwnMessage() {
    return user && user.id === profile?.id;
  }

  return (
    user && (
      <div className={`flex w-full ${userOwnMessage() && "flex-row-reverse"}`}>
        <div className="flex w-1/2 flex-col gap-2 p-2">
          <div
            className={`flex w-full justify-between items-center ${
              userOwnMessage() && "flex-row-reverse"
            }`}
          >
            <div
              className={`flex gap-2 items-center ${
                userOwnMessage() && "flex-row-reverse"
              }`}
            >
              <AvatarWithBadge size="xxs" />
              <p className=" font-semibold">{profile?.username}</p>
            </div>

            <div className="text-xs text-gray-400">
              {format(new Date(messages[0].createdAt), "HH:mm")}
            </div>
          </div>

          <div
            className={`flex flex-col-reverse w-full rounded-b-lg py-4 ${
              userOwnMessage()
                ? "bg-blue-400 rounded-l-lg "
                : "bg-card rounded-r-lg"
            }`}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className="flex px-2 py-1 w-full whitespace-pre-line break-words"
              >
                {m.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
