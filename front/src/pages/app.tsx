import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import FriendsList from "../components/FriendsList";
import MessageList from "../components/MessageList";
import PrivateCanalList from "../components/PrivateCanalList";
import SideServerBar from "../components/SideServerBar";
import { useUserStore } from "../hooks/use-userStore";

export default function AppPage() {
  const { serverId, channelId } = useParams<{
    serverId: string;
    channelId: string;
  }>();

  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCanalChange = (id: string) => {
    navigate(`/app/@me/${id}`);
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col-reverse overflow-hidden">
        <BottomBar />
        <div className="flex h-full overflow-y-hidden">
          <SideServerBar />
          <div className="h-full w-1/5 bg-[#292929]">
            <PrivateCanalList onCanalSelect={handleCanalChange} />
          </div>
          <div className="flex flex-1 h-full">
            {channelId && <MessageList channelId={channelId} />}
          </div>
          <div className="h-full w-1/4 bg-[#292929]">
            <FriendsList />
          </div>
        </div>
      </div>
    </>
  );
}
