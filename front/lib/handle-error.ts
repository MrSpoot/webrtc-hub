import { toast } from "@/hooks/use-toast";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "./utils";

export const handleHttpError = (
  error: AxiosError<AxiosResponse<ErrorResponse, ErrorResponse>, ErrorResponse>
) => {
  if (!error.response) {
    toast({
      itemID: "no-response",
      title: "Impossible de contacter le serveur distant",
      variant: "error",
    });
  } else {
    console.log(error.response);
    switch (error.response.status) {
      case 401:
        //window.location.href = "/login";
        break;
      case 403:
      case 409:
        toast({
          itemID: "error",
          title: error.response.data.message,
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
