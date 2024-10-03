"use client";

import { useUserStore } from "@/hooks/use-userStore";
import BottomBar from "@/src/components/BottomBar";
import FriendsList from "@/src/components/FriendsList";
import MessageList from "@/src/components/MessageList";
import Sidebar from "@/src/components/Sidebar";
import SideServerBar from "@/src/components/SideServerBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppPage() {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen flex-col w-full">
      <div className="flex w-full h-full">
        <SideServerBar />
        <div className="h-full w-1/5 bg-red-400">
          <Sidebar />
        </div>
        <MessageList canalId={0} />
        <div className="h-full w-1/4 bg-[#292929]">
          <FriendsList />
        </div>
      </div>
      <div>
        <BottomBar />
      </div>
    </div>
  );
}
