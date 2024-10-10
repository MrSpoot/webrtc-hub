import { format } from "date-fns";
import { Message } from "../services/canal-service";
import { usePrivateMessageList } from "../services/queries/canal-queries";
import MessageCard from "./MessageCard";
import { Separator } from "./ui/separator";

interface MessageListProps {
  canalId: string;
}

export default function MessageList({ canalId }: MessageListProps) {
  const { data: messages } = usePrivateMessageList(canalId);

  function isSameMinute(timestamp1: number, timestamp2: number): boolean {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getHours() === date2.getHours() &&
      date1.getMinutes() === date2.getMinutes()
    );
  }

  function isSameDay(timestamp1: number, timestamp2: number): boolean {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function groupMessages(messages: Message[]) {
    const groupedMessages = [];
    let currentGroup: Message[] = [];

    for (let i = 0; i < messages.length; i++) {
      const currentMessage = messages[i];
      const previousMessage = messages[i - 1];

      if (
        !previousMessage ||
        currentMessage.senderId !== previousMessage.senderId ||
        !isSameMinute(currentMessage.createdAt, previousMessage.createdAt)
      ) {
        if (currentGroup.length > 0) {
          groupedMessages.push(currentGroup);
        }
        currentGroup = [currentMessage];
      } else {
        currentGroup.push(currentMessage);
      }
    }

    if (currentGroup.length > 0) {
      groupedMessages.push(currentGroup);
    }

    return groupedMessages;
  }

  const groupedMessages = groupMessages(messages || []);

  return (
    <>
      <div className="flex flex-col-reverse w-full p-4 gap-2 overflow-y-auto">
        {groupedMessages.map((group, i, _groups) => {
          const firstMessageInGroup = group[0];

          const previousGroup = _groups[i + 1];
          const shouldAddSeparator =
            previousGroup &&
            !isSameDay(
              firstMessageInGroup.createdAt,
              previousGroup[previousGroup.length - 1].createdAt
            );

          return (
            <div key={i}>
              <MessageCard messages={group} />

              {shouldAddSeparator && (
                <div className="flex w-full justify-center py-4 items-center">
                  <Separator className="w-1/3 bg-gray-400" />
                  <div className="text-xs text-gray-400 px-4">
                    {format(
                      new Date(firstMessageInGroup.createdAt),
                      "dd MMM yyyy"
                    )}
                  </div>
                  <Separator className="w-1/3 bg-gray-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
