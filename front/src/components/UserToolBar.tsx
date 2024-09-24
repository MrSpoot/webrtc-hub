import { GearIcon } from "@radix-ui/react-icons";
import AvatarWithBadge from "./AvatarWithBadge";

export default function UserToolBar() {
  return (
    <div className="flex p-2 justify-between">
      <div className="flex gap-2">
        <AvatarWithBadge size="xs" />
        <div className="flex flex-col">
          <p className="font-semibold">MrSpoot</p>
          <p className=" text-xs">Online</p>
        </div>
      </div>
      <div className="flex items-center">
        <GearIcon className="w-6 h-6" />
      </div>
    </div>
  );
}
