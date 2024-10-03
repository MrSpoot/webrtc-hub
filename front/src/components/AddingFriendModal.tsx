import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Clock, Plus } from "lucide-react";
import { useState } from "react";
import { UserFriend } from "../services";
import {
  useAddFriend,
  useFriendsList,
  useGetProfile,
} from "../services/queries/user-queries";

interface AddingFriendModalProps {
  isOpen: boolean;
  setOpen: (isOpen: false) => void;
}

export default function AddingFriendModal({
  isOpen = true,
  setOpen = () => {},
}: AddingFriendModalProps) {
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();
  const useAddFriendMutation = useAddFriend();
  const { data: profile, isLoading, refetch } = useGetProfile(email, false);
  const { data: friends } = useFriendsList();

  const findFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const _addFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      useAddFriendMutation.mutate(profile.id, {
        onSuccess: (_friend) => {
          queryClient.setQueryData(["friends-list"], (state: UserFriend[]) => {
            if (state) {
              return [...state, _friend];
            }
            return [_friend];
          });
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTrigger />
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
              <Button onClick={findFriend} disabled={isLoading}>
                Find
              </Button>
            </form>
          </div>
          <Separator className="w-5/6" />

          {profile ? (
            <div className="flex items-center space-x-4 w-10/12">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback />
              </Avatar>
              <div className="h-full w-full">{profile.username}</div>
              {friends &&
              friends.filter(
                (f) => f.friend.id === profile.id || f.user.id === profile.id
              ).length > 0 ? (
                <>
                  {!friends?.find(
                    (f) =>
                      f.friend.id === profile.id || f.user.id === profile.id
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
