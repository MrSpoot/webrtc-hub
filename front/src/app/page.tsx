"use client";

import { SpinningLoader } from "@/components/spinning-loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DefaultPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, []);

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <SpinningLoader />
    </div>
  );
}
