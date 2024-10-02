import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cross1Icon } from "@radix-ui/react-icons";
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
        <Button
          variant={"ghost"}
          className="rounded-full h-8 w-8"
          size={"icon"}
        >
          <Cross1Icon />
        </Button>
      </Card>
    )
  );
}
