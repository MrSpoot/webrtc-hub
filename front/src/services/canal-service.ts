import api from "../lib/axios";
import { Profile } from "./user-service";

export interface Channel {
  id: string;
  name: string;
  users: Profile[];
}

export interface Message {
  id: string;
  recipientId: string;
  message: string;
  senderId: number;
  createdAt: number;
}

//TODO: Make pagination
export const getPrivateChannels = (): Promise<Channel[]> => {
  return api
    .get(`/canals?page=0&size=9999`)
    .then((response) => response.data.content)
    .catch((error) => {
      throw error;
    });
};

//TODO: Make pagination
export const getPrivateMessages = (canalId: string): Promise<Message[]> => {
  return api
    .get(`/canals/${canalId}/messages?page=0&size=50&sort=createdAt,desc`)
    .then((response) => response.data.content)
    .catch((error) => {
      throw error;
    });
};

export const sendMessageToCanal = (
  canalId: string,
  message: string
): Promise<Message[]> => {
  return api
    .post(`/canals/${canalId}/messages`, message, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
