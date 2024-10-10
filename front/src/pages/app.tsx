import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import FriendsList from "../components/FriendsList";
import MessageList from "../components/MessageList";
import PrivateCanalList from "../components/PrivateCanalList";
import SideServerBar from "../components/SideServerBar";
import { useUserStore } from "../hooks/use-userStore";

export default function AppPage() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [canalId, setCanalId] = useState<string | undefined>();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCanalChange = (id: string) => {
    setCanalId(id);
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col-reverse overflow-hidden">
        <BottomBar canalId={canalId} />
        <div className="flex h-full overflow-y-hidden">
          <SideServerBar />
          <div className="h-full w-1/5 bg-[#292929]">
            <PrivateCanalList onCanalSelect={handleCanalChange} />
          </div>
          <div className="flex flex-1 h-full">
            {canalId && <MessageList canalId={canalId} />}
          </div>
          <div className="h-full w-1/4 bg-[#292929]">
            <FriendsList />
          </div>
        </div>
      </div>
    </>
  );
}
