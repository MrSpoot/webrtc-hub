import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/use-userStore";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserFriends } from "../services";
import AddingFriendModal from "./AddingFriendModal";
import UserCard from "./UserCard";

export default function FriendsList() {
  const { user, addFriends } = useUserStore();

  const [addingFriendOpen, setAddingFriendOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getUserFriends(user.id)
        .then((friends) => {
          addFriends(friends);
        })
        .catch(() => {});
    }
  }, []);

  return (
    <>
      <div className="flex flex-col text-white h-screen p-2  items-center gap-4">
        <Button
          className="gap-2"
          onClick={() => {
            setAddingFriendOpen(true);
          }}
        >
          <UserPlus className="w-4 h-4" />
          <p>Add friends</p>
        </Button>
        <div className="w-full flex flex-col gap-1 overflow-y-scroll">
          {user?.friends.map((f) =>
            f.friend.id === user.id ? (
              <UserCard key={f.user.id} user={f.user} />
            ) : (
              <UserCard key={f.friend.id} user={f.friend} />
            )
          )}
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
      <AddingFriendModal
        isOpen={addingFriendOpen}
        setOpen={setAddingFriendOpen}
      />
    </>
  );
}
