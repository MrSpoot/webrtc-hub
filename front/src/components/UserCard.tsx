import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircleIcon, TrashIcon } from "lucide-react";
import { Profile } from "../services";
import AvatarWithBadge from "./AvatarWithBadge";

interface UserCardProps {
  user?: Profile;
}

export default function UserCard({ user = undefined }: UserCardProps) {
  return (
    user && (
      <Card className="flex  items-center  p-2">
        <div className="flex gap-2 items-center bg-card flex-1">
          <AvatarWithBadge size="xs" />
          <p className="text-md font-semibold">{user?.username}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={"ghost"}
            className="rounded-full h-8 w-8 p-1"
            size={"icon"}
          >
            <MessageCircleIcon />
          </Button>
          <Button
            variant={"destructive"}
            className="rounded-full h-8 w-8 p-1"
            size={"icon"}
          >
            <TrashIcon />
          </Button>
        </div>
      </Card>
    )
  );
}
