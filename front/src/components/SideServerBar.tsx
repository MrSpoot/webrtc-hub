import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const servers = [
  { id: 1, name: "Général" },
  { id: 2, name: "Aide" },
  { id: 3, name: "Annonces" },
];

export default function SideServerBar() {
  return (
    <div className=" bg-red-500 text-white h-screen p-2">
      <div className="flex flex-col gap-2">
        {servers.map((s) => {
          return (
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{s.name}</AvatarFallback>
            </Avatar>
          );
        })}
      </div>
    </div>
  );
}
