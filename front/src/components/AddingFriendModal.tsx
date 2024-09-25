import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import AvatarWithBadge from "./AvatarWithBadge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { addNewFriend, getUserInfo, Profile } from "../services";
import { Clock, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/hooks/use-userStore";

interface AddingFriendModalProps {
  isOpen: boolean;
}

export default function AddingFriendModal({
  isOpen = true,
}: AddingFriendModalProps) {
  const { user, setUser, addFriend } = useUserStore();

  const [friend, setFriend] = useState<Profile>();

  const [email, setEmail] = useState("");

  const findFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    setFriend(undefined);
    getUserInfo(email)
      .then((d) => {
        if (d) {
          setFriend(d);
        } else {
          toast({
            itemID: "no-friend-find",
            title: "User not find",
            variant: "warning",
          });
        }
      })
      .catch(() => {});
  };

  const _addFriend = async (e: React.FormEvent) => {
    e.preventDefault();

    friend &&
      addNewFriend(friend.id)
        .then((d) => {
          console.log("Add friend");
          console.log(d);
          console.log(user);
          addFriend(d);
        })
        .catch(() => {});
  };

  useEffect(() => {
    console.log(user && user.friends);
  }, [user]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new friends</DialogTitle>
          <DialogDescription>
            Add new friend to have more fun.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full items-center gap-8">
          <div className="flex flex-col gap-4 w-11/12">
            <Label htmlFor="name" className="text-left">
              New friend email
            </Label>
            <form className="flex gap-2">
              <Input
                id="Email"
                placeholder="friend@mail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={findFriend}>Find</Button>
            </form>
          </div>
          <Separator className="w-5/6" />

          {friend ? (
            <div className="flex items-center space-x-4 w-10/12">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback />
              </Avatar>
              <div className="h-full w-full">{friend.username}</div>
              {user &&
              user.friends &&
              user.friends.filter(
                (f) => f.friend.id === friend.id || f.user.id === friend.id
              ).length > 0 ? (
                <>
                  {!user?.friends?.find(
                    (f) => f.friend.id === friend.id || f.user.id === friend.id
                  )?.accepted && (
                    <Button
                      size={"icon"}
                      disabled
                      className="aspect-square rounded-full h-8"
                    >
                      <Clock />
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    size={"icon"}
                    className="aspect-square rounded-full h-8"
                    onClick={_addFriend}
                  >
                    <Plus />
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4 w-10/12">
              <Skeleton className="aspect-square h-12 w-12 rounded-full" />
              <div className="h-full w-full">
                <Skeleton className="my-2 h-4 w-1/2" />
              </div>
              <Skeleton className=" aspect-square rounded-full h-8" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
