import { ReactNode, createContext, useContext } from "react";
import authService from "../services/auth.services";

const services = {
  authService: authService,
};

const context = createContext<any>(undefined);

const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <context.Provider value={services}>{children}</context.Provider>;
};

const useServices = () => {
  const serviceContext = useContext(context);
  if (serviceContext === undefined) {
    throw new Error("useApiService must be used within an ApiServiceProvider");
  }
  return serviceContext;
};

export { ServiceProvider, useServices };
