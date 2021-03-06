import { BackendClient } from "../clients/api";
import { getConfig } from "./config";

/* function to define a Backend instance with base url set */
export const baseUrlBackendClient = (token: string) => {
  const url =
    getConfig("IO_ONBOARDING_PA_API_HOST") +
    ":" +
    getConfig("IO_ONBOARDING_PA_API_PORT");
  return BackendClient(url, token);
};

/* function to manage errors */
export const manageErrorReturnCodes = (
  status: number,
  setAlert: () => void,
  logout: () => void
) => {
  // with status 401 we have an expired token -> user needs to be logged out to perform login again and get new token
  if (status === 401) {
    logout();
  } else {
    setAlert();
  }
};
