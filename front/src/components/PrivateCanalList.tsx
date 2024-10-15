import { useNavigate } from "react-router-dom";
import { usePrivateCanal } from "../services/queries/canal-queries";
import PrivateCanalCard from "./PrivateCanalCard";
import { SpinningLoader } from "./spinning-loader";

export default function PrivateCanalList() {
  const { data: canals, isLoading } = usePrivateCanal();

  const navigate = useNavigate();

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
              onClick={() => navigate(`/app/@me/${c.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
