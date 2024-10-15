import api from "../lib/axios";
import { Channel } from "./canal-service";
import { Profile } from "./user-service";

export interface Server {
  id: string;
  name: string;
  channels: Channel[];
  users: Profile[];
}

export const getUserServers = (): Promise<Server[]> => {
  return api
    .get(`/servers`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
