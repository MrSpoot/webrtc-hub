import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewFriend,
  getUserFriends,
  getUserInfo,
  getUserProfile,
  getUserProfilesById,
} from "../user-service";

export const useFriendsList = () =>
  useQuery({
    queryKey: ["friends-list"],
    queryFn: () => getUserFriends(),
  });

export const useCanalProfilesList = (canalId: string, ids: number[]) =>
  useQuery({
    queryKey: [`canal-${canalId}-profiles-list`],
    queryFn: () => getUserProfilesById(ids),
  });

export const useProfile = (id: number) =>
  useQuery({
    queryKey: [`profile-${id}`],
    queryFn: () => getUserProfile(id),
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
