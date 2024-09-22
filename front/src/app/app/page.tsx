"use client";

import ChatArea from "@/src/components/ChatArea";
import Sidebar from "@/src/components/Sidebar";
import SideServerBar from "@/src/components/SideServerBar";

export default function AppPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SideServerBar />
      <Sidebar />
      <div className="flew w-full">
        <ChatArea />
      </div>
      <Sidebar />
    </div>
  );
}
