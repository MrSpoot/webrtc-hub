import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SideServerBar() {
  return (
    <div className=" bg-card text-white p-2">
      <div className="flex flex-col gap-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
