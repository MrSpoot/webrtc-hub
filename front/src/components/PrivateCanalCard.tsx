import { useUserStore } from "../hooks/use-userStore";
import { Channel } from "../services/canal-service";
import AvatarWithBadge from "./AvatarWithBadge";
import { Card } from "./ui/card";

interface CanalCardProps {
  canal: Channel;
  onClick?: () => void;
}

export default function PrivateCanalCard({
  canal,
  onClick = () => {},
}: CanalCardProps) {
  const { user } = useUserStore();

  //TODO: CHANGE AVATAR DISPLAY
  return (
    user && (
      <Card
        className="flex  items-center  p-4 hover:bg-card/60"
        onClick={onClick}
      >
        <div className="flex gap-2 items-center  flex-1">
          {canal.users?.length === 2 ? (
            <>
              <AvatarWithBadge size="xs" />
              <p className="text-md font-semibold">
                {canal.users.find((p) => p.id !== user.id)?.username}
              </p>
            </>
          ) : (
            <>
              <AvatarWithBadge size="xs" />
              <p className="text-md font-semibold">{canal.name}</p>
            </>
          )}
        </div>
      </Card>
    )
  );
}
