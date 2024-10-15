import { Server } from "@/services/server-service";
import PrivateCanalCard from "./PrivateCanalCard";

interface ServerChannelListProps {
  server: Server;
}

export default function ServerChannelList({ server }: ServerChannelListProps) {
  return (
    <div className="flex flex-col text-white p-2 gap-1 items-center">
      <div className="w-full flex flex-col gap-1 justify-center">
        {server.channels?.map((c) => (
          <PrivateCanalCard key={c.id} canal={c} />
        ))}
      </div>
    </div>
  );
}
