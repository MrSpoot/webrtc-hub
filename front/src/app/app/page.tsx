"use client";

import AddingFriendModal from "@/src/components/AddingFriendModal";
import UserToolBar from "@/src/components/UserToolBar";
import { addNewFriend } from "@/src/services";

export default function AppPage() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addNewFriend(2)
      .then((d) => {
        console.log(d);
      })
      .catch(() => {});
  };

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
      <AddingFriendModal />
    </>
  );
}
