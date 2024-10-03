import { useQuery } from "@tanstack/react-query";
import { getUserFriends, getUserInfo } from "../userService";

export const useFriendsList = () =>
  useQuery({
    queryKey: ["friends-list"],
    queryFn: () => getUserFriends(),
  });

export const useGetProfile = (email: string) =>
  useQuery({
    queryKey: ["profile-email"],
    queryFn: () => getUserInfo(email),
    staleTime: 5 * 60 * 1000,
  });
