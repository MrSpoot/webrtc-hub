import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            // eslint-disable-next-line react/jsx-key
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
