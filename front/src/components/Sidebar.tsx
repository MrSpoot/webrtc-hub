import Link from "next/link";

const channels = [
  { id: 1, name: "Général" },
  { id: 2, name: "Aide" },
  { id: 3, name: "Annonces" },
];

export default function Sidebar() {
  return (
    <div className="bg-[#292929] text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Canaux</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} className="mb-2">
            <Link
              href={`/channel/${channel.id}`}
              className="hover:text-gray-300"
            >
              # {channel.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
