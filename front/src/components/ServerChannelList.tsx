import { useServer } from "@/services/queries/server-queries";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SpinningLoader } from "./spinning-loader";
import ServerChannelCard from "./ServerChannelCard";

export default function ServerChannelList() {
  const { data: servers, isLoading } = useServer();

  const { serverId, channelId } = useParams<{
    serverId: string;
    channelId: string;
  }>();

  const navigate = useNavigate();
  const [server] = useState(servers?.find((s) => s.id === serverId));

  return isLoading || !server ? (
    <SpinningLoader />
  ) : (
    <div className="flex flex-col text-white p-2 gap-1 items-center">
      <div className="w-full flex flex-col gap-1 justify-center">
        {server.channels.map((c) => (
          <ServerChannelCard
            key={c.id}
            canal={c}
            onClick={() => {
              navigate(`/app/${serverId}/${c.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
