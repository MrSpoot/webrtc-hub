"use client";

import { useUserStore } from "@/hooks/use-userStore";
import BottomBar from "@/src/components/BottomBar";
import { useEffect } from "react";

export default function AppPage() {
  const { user } = useUserStore();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Cette div prendra tout l'espace restant */}
      </div>
      <BottomBar />
    </div>
  );
}
