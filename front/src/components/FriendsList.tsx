import { SpinningLoader } from "@/components/spinning-loader";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/use-userStore";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useFriendsList } from "../services/queries/user-queries";
import AddingFriendModal from "./AddingFriendModal";
import UserCard from "./UserCard";

export default function FriendsList() {
  const { user } = useUserStore();

  const [addingFriendOpen, setAddingFriendOpen] = useState(false);
  const { data: friends, isLoading } = useFriendsList();

  return (
    <>
      <div className="flex flex-col text-white h-full p-2  items-center gap-4">
        <Button
          className="gap-2"
          onClick={() => {
            setAddingFriendOpen(true);
          }}
        >
          <UserPlus className="w-4 h-4" />
          <p>Add friends</p>
        </Button>
        <div className="w-full flex flex-col gap-1 overflow-y-scroll justify-center">
          {isLoading ? (
            <SpinningLoader />
          ) : (
            user &&
            friends &&
            friends.map((f) =>
              f.friend.id === user.id ? (
                <UserCard key={f.user.id} user={f.user} />
              ) : (
                <UserCard key={f.friend.id} user={f.friend} />
              )
            )
          )}
        </div>
      </div>
      <AddingFriendModal
        isOpen={addingFriendOpen}
        setOpen={setAddingFriendOpen}
      />
    </>
  );
}
