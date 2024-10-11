import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../hooks/use-userStore";
import {
  addNewFriend,
  getUserFriends,
  getUserInfo,
  getUserProfile,
  getUserProfilesById,
} from "../user-service";

export const useFriendsList = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ["friends-list", user?.id],
    queryFn: () => getUserFriends(),
  });
};

export const useCanalProfilesList = (canalId: string, ids: number[]) =>
  useQuery({
    queryKey: ["canal-profiles-list", canalId],
    queryFn: () => getUserProfilesById(ids),
  });

export const useProfile = (id: number) =>
  useQuery({
    queryKey: ["profile", id],
    queryFn: () => getUserProfile(id),
  });

export const useGetProfile = (email: string, callOnRender?: boolean) => {
  const _callOnRender = callOnRender ?? true;
  return useQuery({
    queryKey: ["profile-email", email],
    queryFn: () => getUserInfo(email),
    staleTime: 5 * 60 * 1000,
    enabled: _callOnRender,
  });
};

export const useAddFriend = () =>
  useMutation({
    mutationFn: (data: number) => addNewFriend(data),
  });
