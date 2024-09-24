import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import AvatarWithBadge from "./AvatarWithBadge";
import { Input } from "@/components/ui/input";

export default function AddingFriendModal() {
  return (
    <Card className="max-w-screen-sm aspect-square">
      <CardHeader>
        <Input></Input>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
}
