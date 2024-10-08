import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { usePrivateMessageList } from "../services/queries/canal-queries";
import MessageCard from "./MessageCard";

interface MessageListProps {
  canalId: string;
}

export default function MessageList({ canalId }: MessageListProps) {
  const { data: messages } = usePrivateMessageList(canalId);

  function isSameDay(timestamp1: number, timestamp2: number): boolean {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  return (
    <>
      <div className="flex flex-col-reverse w-full p-4 gap-2 overflow-y-auto">
        {messages?.map((m, i, _messages) => {
          if (
            i < _messages.length - 1 &&
            !isSameDay(_messages[i + 1].createdAt, m.createdAt)
          ) {
            return (
              <>
                <MessageCard key={m.id} message={m} />
                <div className="flex w-full justify-center py-4 items-center">
                  <Separator className="w-1/3 bg-gray-400" />
                  <div className="text-xs text-gray-400 px-4">
                    {format(new Date(m.createdAt), "dd MMM yyyy")}
                  </div>
                  <Separator className="w-1/3 bg-gray-400" />
                </div>
              </>
            );
          } else {
            return <MessageCard key={m.id} message={m} />;
          }
        })}
      </div>
    </>
  );
}
