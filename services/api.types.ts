// import { User, Version } from "@utils/types";
import { AppMeta, SessionMeta } from "@/lib/types";
import { GeneralApiProblem } from "./apiProblem";

export interface ApiConfig {
  url: string;
  timeout: number;
}

export type SuccessBase = { kind: "ok" };

// APP
export type getAllAppsResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: Array<AppMeta> };
export type SingleAppResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: AppMeta };
export type CreateAppResponse = SuccessBase | GeneralApiProblem;

// SESSIONS
export type AllSessionsResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: SessionMeta[] };
export type SingleSessionRes =
  | GeneralApiProblem
  | { kind: "ok"; data: SessionMeta };
export type ForgetPasswordRes = SuccessBase | GeneralApiProblem;
