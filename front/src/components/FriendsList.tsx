import { SpinningLoader } from "@/components/spinning-loader";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/use-userStore";
import { Check, MessageCircleIcon, TrashIcon, X } from "lucide-react";
import { useState } from "react";
import { useFriendsList } from "../services/queries/user-queries";
import AddingFriendModal from "./AddingFriendModal";
import UserCard from "./UserCard";

type LIST_TYPE = "REQUEST" | "FRIENDS";

export default function FriendsList() {
  const { user } = useUserStore();
  const [selectTab, setSelectTab] = useState<LIST_TYPE>("FRIENDS");

  const [addingFriendOpen, setAddingFriendOpen] = useState(false);
  const { data: friends, isLoading } = useFriendsList();

  return (
    <>
      <div className="flex flex-col text-white h-full p-2  items-center gap-4">
        <div className="flex w-full gap-2 justify-evenly items-center">
          <Button
            size={"sm"}
            variant={"ghost"}
            className="gap-2"
            onClick={() => {
              setSelectTab("FRIENDS");
            }}
          >
            <p>Friends</p>
          </Button>
          <Button
            size={"sm"}
            variant={"ghost"}
            className="gap-2"
            onClick={() => {
              setSelectTab("REQUEST");
            }}
          >
            <p>Request</p>
          </Button>
          <Button
            size={"sm"}
            className="gap-2"
            onClick={() => {
              setAddingFriendOpen(true);
            }}
          >
            <p>Add</p>
          </Button>
        </div>

        {selectTab === "FRIENDS" && (
          <div className="w-full flex flex-col gap-1 overflow-y-scroll justify-center">
            {isLoading ? (
              <SpinningLoader />
            ) : (
              user &&
              friends &&
              friends
                .filter((f) => f.accepted)
                .map((f) => (
                  <UserCard
                    key={f.friend.id === user.id ? f.user.id : f.friend.id}
                    user={f.friend.id === user.id ? f.user : f.friend}
                    leftProps={[
                      <Button
                        key={"message-button"}
                        variant={"ghost"}
                        className="rounded-full h-8 w-8 p-1"
                        size={"icon"}
                      >
                        <MessageCircleIcon />
                      </Button>,
                      <Button
                        key={"trash-button"}
                        variant={"destructive"}
                        className="rounded-full h-8 w-8 p-1"
                        size={"icon"}
                      >
                        <TrashIcon />
                      </Button>,
                    ]}
                  />
                ))
            )}
          </div>
        )}
        {selectTab === "REQUEST" && (
          <div className="w-full flex flex-col gap-1 overflow-y-scroll justify-center">
            {isLoading ? (
              <SpinningLoader />
            ) : (
              user &&
              friends &&
              friends
                .filter((f) => !!!f.accepted)
                .map((f) => (
                  <UserCard
                    key={f.friend.id === user.id ? f.user.id : f.friend.id}
                    user={f.friend.id === user.id ? f.user : f.friend}
                    leftProps={[
                      <Button
                        key={"message-button"}
                        className="rounded-full h-6 w-6 p-1"
                        size={"icon"}
                      >
                        <Check />
                      </Button>,
                      <Button
                        key={"trash-button"}
                        variant={"destructive"}
                        className="rounded-full h-6 w-6 p-1"
                        size={"icon"}
                      >
                        <X />
                      </Button>,
                    ]}
                  />
                ))
            )}
          </div>
        )}
      </div>
      <AddingFriendModal
        isOpen={addingFriendOpen}
        setOpen={setAddingFriendOpen}
      />
    </>
  );
}
