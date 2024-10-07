import { Message } from "@/src/services/canal-service";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { useProfile } from "../services/queries/user-queries";

interface MessageProps {
  message: Message;
}

export default function MessageCard({ message }: MessageProps) {
  const { data: profile } = useProfile(message.senderId);

  return (
    <div className="flex flex-col text-white w-full bg-card p-4 gap-2 rounded-xl">
      <div className="flex items-center gap-2">
        <Avatar className=" rounded-full">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="rounded-full w-10 h-10"
            alt="@shadcn"
          />
          <AvatarFallback />
        </Avatar>
        <p className=" font-semibold">{profile?.username}</p>
        <div className="text-xs w-full text-gray-400">
          {format(new Date(message.createdAt), "dd/MM/yyyy HH:mm:ss")}
        </div>
      </div>
      <p className="pl-12 w-11/12 whitespace-pre-line">{message.message}</p>
    </div>
  );
}
