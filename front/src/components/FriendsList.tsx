import { SpinningLoader } from "@/components/spinning-loader";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/hooks/use-userStore";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Clock, MessageCircleIcon, TrashIcon, X } from "lucide-react";
import { useState } from "react";
import { reponseToFriendRequest, UserFriend } from "../services";
import { useFriendsList } from "../services/queries/user-queries";
import AddingFriendModal from "./AddingFriendModal";
import UserCard from "./UserCard";

type LIST_TYPE = "REQUEST" | "FRIENDS";

export default function FriendsList() {
  const { user } = useUserStore();
  const [selectTab, setSelectTab] = useState<LIST_TYPE>("FRIENDS");

  const queryClient = useQueryClient();
  const [addingFriendOpen, setAddingFriendOpen] = useState(false);
  const { data: friends, isLoading } = useFriendsList();

  const handleResponseToFriendsRequest = (id: number, valid: boolean) => {
    reponseToFriendRequest(id, valid)
      .then((uf) => {
        if (uf.accepted) {
          queryClient.setQueryData(
            ["friends-list"],
            (state: UserFriend[] | undefined) => {
              if (state) {
                return state.map((friend) =>
                  friend.id === uf.id ? { ...friend, ...uf } : friend
                );
              }
              return [uf];
            }
          );
        } else {
          queryClient.setQueryData(
            ["friends-list"],
            (state: UserFriend[] | undefined) => {
              if (state) {
                return state.filter((friend) => friend.id !== uf.id); // Supprime l'élément avec _friend.id
              }
              return [];
            }
          );
        }
      })
      .catch(() => {});
  };

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
                    leftProps={
                      user.id === f.friend.id
                        ? [
                            <Button
                              key={"check-button"}
                              className="rounded-full h-6 w-6 p-1"
                              size={"icon"}
                              onClick={() =>
                                handleResponseToFriendsRequest(f.id, true)
                              }
                            >
                              <Check />
                            </Button>,
                            <Button
                              key={"cross-button"}
                              variant={"destructive"}
                              className="rounded-full h-6 w-6 p-1"
                              size={"icon"}
                              onClick={() =>
                                handleResponseToFriendsRequest(f.id, false)
                              }
                            >
                              <X />
                            </Button>,
                          ]
                        : [
                            <Button
                              key={"clock-button"}
                              variant={"destructive"}
                              className="rounded-full h-6 w-6 p-1"
                              size={"icon"}
                              disabled
                              onClick={() =>
                                handleResponseToFriendsRequest(f.id, false)
                              }
                            >
                              <Clock />
                            </Button>,
                          ]
                    }
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
