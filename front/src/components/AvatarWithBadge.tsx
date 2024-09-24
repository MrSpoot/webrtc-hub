import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarSize = "xs" | "sm" | "md" | "lg";

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-10 h-10",
  sm: "w-16 h-16", // Petites tailles
  md: "w-24 h-24", // Taille moyenne
  lg: "w-32 h-32", // Grande taille
};

const badgeSizeClasses: Record<AvatarSize, string> = {
  xs: "w-2 h-2",
  sm: "w-4 h-4", // Petites tailles
  md: "w-6 h-6", // Taille moyenne
  lg: "w-10 h-10", // Grande taille
};

interface AvatarWithBadgeProps {
  size?: AvatarSize;
}

export default function AvatarWithBadge({ size = "md" }: AvatarWithBadgeProps) {
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <Avatar className="w-full h-full">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback />
      </Avatar>
      <div
        className={`absolute bg-green-400 bottom-0 right-0 flex items-center justify-center aspect-square ${badgeSizeClasses[size]} rounded-full`}
      />
    </div>
  );
}
