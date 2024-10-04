import { Card } from "@/components/ui/card";
import { Profile } from "../services";
import AvatarWithBadge from "./AvatarWithBadge";

interface UserCardProps {
  user?: Profile;
  leftProps?: JSX.Element[];
}

export default function UserCard({
  user = undefined,
  leftProps = [],
}: UserCardProps) {
  return (
    user && (
      <Card className="flex  items-center  p-4">
        <div className="flex gap-2 items-center flex-1">
          <AvatarWithBadge size="xs" />
          <p className="text-md font-semibold">{user?.username}</p>
        </div>
        <div className="flex gap-2">{leftProps.map((p) => p)}</div>
      </Card>
    )
  );
}
