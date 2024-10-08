import { usePrivateMessageList } from "../services/queries/canal-queries";
import MessageCard from "./MessageCard";

interface MessageListProps {
  canalId: string;
}

export default function MessageList({ canalId }: MessageListProps) {
  const { data: messages } = usePrivateMessageList(canalId);

  return (
    <>
      <div className="flex flex-col-reverse w-full p-4 gap-2 overflow-y-auto">
        {messages?.map((m) => (
          <MessageCard key={m.id} message={m} />
        ))}
      </div>
    </>
  );
}
