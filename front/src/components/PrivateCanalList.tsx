import { usePrivateCanal } from "../services/queries/canal-queries";
import PrivateCanalCard from "./PrivateCanalCard";
import { SpinningLoader } from "./spinning-loader";

interface PrivateCanalListProps {
  onCanalSelect: (id: string) => void;
}

export default function PrivateCanalList({
  onCanalSelect,
}: PrivateCanalListProps) {
  const { data: canals, isLoading } = usePrivateCanal();

  return (
    <div className="flex flex-col text-white p-2 gap-1 items-center">
      <div className="w-full flex flex-col gap-1 justify-center">
        {isLoading ? (
          <SpinningLoader />
        ) : (
          canals?.map((c) => (
            <PrivateCanalCard
              key={c.id}
              canal={c}
              onClick={() => onCanalSelect(c.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
