import { useUserStore } from "../hooks/use-userStore";
import { PrivateCanal } from "../services/canal-service";
import { useCanalProfilesList } from "../services/queries/user-queries";
import AvatarWithBadge from "./AvatarWithBadge";
import { Card } from "./ui/card";

interface CanalCardProps {
  canal: PrivateCanal;
  onClick?: () => void;
}

export default function PrivateCanalCard({
  canal,
  onClick = () => {},
}: CanalCardProps) {
  const { user } = useUserStore();
  const { data: profiles } = useCanalProfilesList(canal.id, canal.users);

  //TODO: CHANGE AVATAR DISPLAY
  return (
    user && (
      <Card
        className="flex  items-center  p-4 hover:bg-card/60"
        onClick={onClick}
      >
        <div className="flex gap-2 items-center  flex-1">
          {profiles?.length === 2 ? (
            <>
              <AvatarWithBadge size="xs" />
              <p className="text-md font-semibold">
                {profiles.find((p) => p.id !== user.id)?.username}
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </Card>
    )
  );
}
