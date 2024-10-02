"use client";

import { useUserStore } from "@/hooks/use-userStore";
import BottomBar from "@/src/components/BottomBar";
import Sidebar from "@/src/components/Sidebar";
import SideServerBar from "@/src/components/SideServerBar";
import { useEffect } from "react";

export default function AppPage() {
  const { user } = useUserStore();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="flex h-screen flex-col w-full">
      <div className="flex flex-1 overflow-y-auto">
        <SideServerBar />
        <div className="h-full w-1/5 bg-red-400">
          <Sidebar />
        </div>
        <div className="h-full flex-1 "></div>
        <div className="h-full w-1/4 bg-[#292929]"></div>
      </div>
      <div>
        <BottomBar />
      </div>
    </div>
  );
}
