import { ApiResponse } from "apisauce";

export type GeneralApiProblem =
  | { kind: "timeout"; message: string; temporary: true }
  | { kind: "cannot-connect"; message: string; temporary: true }
  | { kind: "server"; message: string }
  | { kind: "bad-request"; message: string }
  | { kind: "unauthorized"; message: string }
  | { kind: "forbidden"; message: string }
  | { kind: "not-found"; message: string }
  | { kind: "rejected"; message: string }
  | { kind: "unknown"; message: string; temporary: true }
  | { kind: "bad-data"; message: string };

export function getGeneralApiProblem(
  response: ApiResponse<any>
): GeneralApiProblem | null {
  const defaultMessage = response?.data?.message || "";
  const defaultDescription = response?.data?.description || "";

  switch (response.problem) {
    case "CONNECTION_ERROR":
      return {
        kind: "cannot-connect",
        message: defaultMessage,
        temporary: true,
      };
    case "NETWORK_ERROR":
      return {
        kind: "cannot-connect",
        message: defaultMessage,
        temporary: true,
      };
    case "TIMEOUT_ERROR":
      return {
        kind: "timeout",
        message: defaultMessage,
        temporary: true,
      };
    case "SERVER_ERROR":
      return { kind: "server", message: defaultMessage };
    case "UNKNOWN_ERROR":
      return {
        kind: "unknown",
        message: defaultMessage,
        temporary: true,
      };
    case "CLIENT_ERROR":
      switch (response.status) {
        case 400:
          return {
            kind: "bad-request",
            message: defaultMessage,
          };
        case 401:
          return {
            kind: "unauthorized",
            message: defaultMessage,
          };
        case 403:
          return { kind: "forbidden", message: defaultMessage };
        case 404:
          return { kind: "not-found", message: defaultMessage };
        default:
          return { kind: "rejected", message: defaultMessage };
      }
    case "CANCEL_ERROR":
      return null; // Return null for cancel error
    default:
      return null;
  }
}
