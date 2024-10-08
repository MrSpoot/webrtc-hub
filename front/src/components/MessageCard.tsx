import { useUserStore } from "@/hooks/use-userStore";
import { Message } from "@/src/services/canal-service";
import { format } from "date-fns";
import { useProfile } from "../services/queries/user-queries";
import AvatarWithBadge from "./AvatarWithBadge";

interface MessageProps {
  messages: Message[];
}

export default function MessageCard({ messages }: MessageProps) {
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
            className={`flex flex-col w-full rounded-b-lg px-2 py-4 whitespace-pre-line gap-4 ${
              userOwnMessage()
                ? "bg-blue-400 rounded-l-lg "
                : "bg-card rounded-r-lg"
            }`}
          >
            {messages.map((m) => (
              <p key={m.id}>{m.message}</p>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
