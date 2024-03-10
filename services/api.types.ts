// import { User, Version } from "@utils/types";
import { AppMeta, SessionMeta, TeamMember } from "@/lib/types";
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
export type CreateAppResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: AppMeta };

// SESSIONS
export type AllSessionsResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: SessionMeta[] };
export type SingleSessionRes =
  | GeneralApiProblem
  | { kind: "ok"; data: SessionMeta };
export type ForgetPasswordRes = SuccessBase | GeneralApiProblem;

// ORGANIZATION
export type fetchOrganizationTeamRes =
  | { kind: "ok"; data: { users: Array<TeamMember> } }
  | GeneralApiProblem;
