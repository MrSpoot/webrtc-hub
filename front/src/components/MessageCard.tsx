import { useUserStore } from "@/hooks/use-userStore";
import { Message } from "@/src/services/canal-service";
import { format } from "date-fns";
import { useProfile } from "../services/queries/user-queries";
import AvatarWithBadge from "./AvatarWithBadge";

interface MessageProps {
  message: Message;
}

export default function MessageCard({ message }: MessageProps) {
  const { user } = useUserStore();
  const { data: profile } = useProfile(message.senderId);

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
              {format(new Date(message.createdAt), "HH:mm")}
            </div>
          </div>

          <div
            className={`flex w-full rounded-b-lg px-2 py-4 whitespace-pre-line ${
              userOwnMessage()
                ? "bg-blue-400 rounded-l-lg "
                : "bg-card rounded-r-lg"
            }`}
          >
            {message.message}
          </div>
        </div>
      </div>
    )

    // <div className="flex flex-col text-white w-full bg-card p-4 gap-2 rounded-xl">
    //   <div className="flex items-center gap-2">
    //     <Avatar className=" rounded-full">
    //       <AvatarImage
    //         src="https://github.com/shadcn.png"
    //         className="rounded-full w-10 h-10"
    //         alt="@shadcn"
    //       />
    //       <AvatarFallback />
    //     </Avatar>
    //     <p className=" font-semibold">{profile?.username}</p>
    //     <div className="text-xs w-full text-gray-400">
    //       {format(new Date(message.createdAt), "dd/MM/yyyy HH:mm:ss")}
    //     </div>
    //   </div>
    //   <p className="pl-12 w-11/12 whitespace-pre-line">{message.message}</p>
    // </div>
  );
}
