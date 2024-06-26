import { ReactNode, createContext, useContext, useState } from "react";
import User from "../models/user";

const context = createContext<any>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <context.Provider value={{ user, setUser }}>{children}</context.Provider>
  );
};

const useUser = () => {
  const serviceContext = useContext(context);
  if (serviceContext === undefined) {
    throw new Error("useApiService must be used within an ApiServiceProvider");
  }
  return serviceContext;
};

export { UserProvider, useUser };
