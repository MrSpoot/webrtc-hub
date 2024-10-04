"use client";

import { useUserStore } from "@/hooks/use-userStore";
import BottomBar from "@/src/components/BottomBar";
import FriendsList from "@/src/components/FriendsList";
import MessageList from "@/src/components/MessageList";
import PrivateCanalList from "@/src/components/PrivateCanalList";
import SideServerBar from "@/src/components/SideServerBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppPage() {
  const { user } = useUserStore();
  const router = useRouter();
  const [canalId, setCanalId] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCanalChange = (id: string) => {
    setCanalId(id);
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col-reverse max-h-screen max-w-screen">
        <BottomBar />
        <div className="flex flex-1 max-h-full">
          <SideServerBar />
          <div className="h-full w-1/5 bg-[#292929]">
            <PrivateCanalList onCanalSelect={handleCanalChange} />
          </div>
          <div className="flex flex-1 overflow-y-scroll">
            {canalId !== "" && <MessageList canalId={canalId} />}
          </div>
          <div className="h-full w-1/4 bg-[#292929]">
            <FriendsList />
          </div>
        </div>
      </div>
    </>
  );
}
