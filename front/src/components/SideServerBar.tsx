import { useServer } from "@/services/queries/server-queries";
import { TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import ServerListHeader from "./ServerListHeader";

export default function SideServerBar() {
  const { data: servers } = useServer();
  const navigate = useNavigate();

  return (
    <div className="bg-card text-white p-2 h-full">
      <div className="flex flex-col gap-2">
        {servers?.map((s) => (
          <TooltipProvider key={s.id}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                {/* Avatar */}
                <Avatar
                  className="w-12 h-12"
                  onClick={() => navigate(`/app/${s.id}`)}
                >
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>{s.name}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent
                  side="right" // Position à gauche
                  align="center"
                  className="px-4 py-2 rounded"
                >
                  {s.name}
                  <TooltipArrow />
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
