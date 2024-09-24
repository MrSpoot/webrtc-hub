import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import AvatarWithBadge from "./AvatarWithBadge";

export default function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 min-w-64">
          <AvatarWithBadge />
          <p className="text-xl font-semibold">MrSpoot</p>
        </div>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
}
