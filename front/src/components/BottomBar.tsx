import {
  ExitIcon,
  GearIcon,
  PaperPlaneIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { HeadphonesIcon, MicIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../hooks/use-userStore";
import { sendMessageToCanal } from "../services/canal-service";
import { useLogout } from "../services/queries/auth-queries";
import AvatarWithBadge from "./AvatarWithBadge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface BottomBarProps {
  canalId?: string;
}

export default function BottomBar({ canalId }: BottomBarProps) {
  const [message, setMessage] = useState("");
  const { user } = useUserStore();

  const navigate = useNavigate();

  const useLogoutMutation = useLogout();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    useLogoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const handleSubmit = async () => {
    if (canalId && message !== "") {
      sendMessageToCanal(canalId, message)
        .then((m) => {
          console.log(m);
          setMessage("");
        })
        .catch(() => {});
    }
  };

  return (
    <div className="flex bg-card items-center p-2 gap-4">
      <Button
        variant={"ghost"}
        className="rounded-full"
        size={"icon"}
        onClick={handleLogout}
      >
        <ExitIcon className="h-6 w-6" />
      </Button>
      <div className="flex w-1/5"></div>
      <div className="flex rounded-full flex-1 bg-[#1a1a1a] items-center p-2">
        <Button variant={"ghost"} className="rounded-full" size={"icon"}>
          <PlusIcon />
        </Button>
        <Input
          type="text"
          placeholder="Tapez votre message..."
          className="flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
        <Button
          variant={"ghost"}
          className="rounded-full"
          size={"icon"}
          onClick={handleSubmit}
        >
          <PaperPlaneIcon />
        </Button>
      </div>
      <div className="flex py-2 px-4 justify-between w-1/4">
        <div className="flex gap-2 items-center">
          <AvatarWithBadge size="xs" />
          <p className="font-semibold">{user?.username}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <MicIcon className="h-6 w-6" />
          </Button>
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <HeadphonesIcon className="h-6 w-6" />
          </Button>
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <GearIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
