import { toast } from "@/hooks/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "./utils";

export const handleHttpError = (
  error: AxiosError<AxiosResponse<ErrorResponse>>
) => {
  if (!error.response) {
    toast({
      itemID: "no-response",
      title: "Impossible de contacter le serveur distant",
      variant: "error",
    });
  } else {
    switch (error.response.status) {
      case 401:
        toast({
          itemID: "expired-session",
          title: error.response.data.data.message,
          variant: "info",
        });
        break;
      case 403:
        toast({
          itemID: "unauthorized",
          title: "Vous n'êtes pas autorisé à accéder à cette ressource",
          variant: "error",
        });
        break;
      default:
        toast({
          itemID: "unspecified",
          title:
            "Une erreur est survenue. Contactez votre administrateur si le problème persiste",
          variant: "error",
        });
        break;
    }
  }
};
