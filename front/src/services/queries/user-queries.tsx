import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewFriend, getUserFriends, getUserInfo } from "../userService";

export const useFriendsList = () =>
  useQuery({
    queryKey: ["friends-list"],
    queryFn: () => getUserFriends(),
  });

export const useGetProfile = (email: string, callOnRender?: boolean) => {
  const _callOnRender = callOnRender ?? true;
  return useQuery({
    queryKey: ["profile-email"],
    queryFn: () => getUserInfo(email),
    staleTime: 5 * 60 * 1000,
    enabled: _callOnRender,
  });
};

export const useAddFriend = () =>
  useMutation({
    mutationFn: (data: number) => addNewFriend(data),
  });
