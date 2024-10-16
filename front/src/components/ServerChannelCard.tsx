import { Hash } from "lucide-react";
import { Channel } from "../services/canal-service";
interface ServerChannelCardProps {
  canal: Channel;
  onClick?: () => void;
}

export default function ServerChannelCard({
  canal,
  onClick = () => {},
}: ServerChannelCardProps) {
  return (
    <div
      className="flex gap-2 items-center text-muted-foreground hover:bg-card-foreground/10 p-2 rounded-lg hover:text-white font-semibold"
      onClick={onClick}
    >
      <Hash className="text-muted-foreground" /> {canal.name}
    </div>
  );
}
