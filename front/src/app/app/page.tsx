"use client";

import { useUserStore } from "@/hooks/use-userStore";
import AddingFriendModal from "@/src/components/AddingFriendModal";
import { useEffect } from "react";

export default function AppPage() {
  const { user } = useUserStore();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <SideServerBar />
    //   <Sidebar />
    //   <div className="flew w-full">
    //     <ChatArea />
    //   </div>
    //   <Sidebar />

    // </div>
    <>
      <AddingFriendModal isOpen />
    </>
  );
}
