// import { User, Version } from "@utils/types";
import { AppMeta, SessionCardMeta, TeamMember } from "@/lib/types";
import { GeneralApiProblem } from "./apiProblem";

export interface ApiConfig {
  url: string;
  timeout: number;
}

export type SuccessBase = { kind: "ok" };

interface AppBase {
  _id: string;
  name: string;
}
interface SessionBase {
  _id: string;
  createdAt: string;
  updatedAt: string;
  sdkVersion: string;
  totalRecorded?: number;
  ip?: string;
}
interface AppScene {
  _id: string;
  name: string;
  ply: string;
}
export interface SessionMeta extends SessionBase {
  app: AppBase;
  appScene: AppScene;
  sessionId: string;
  stitchSession: string;
  sessions: string[];
  files?: any;
}

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
export type DeleteAppResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: AppMeta };

// SESSIONS
export type AllSessionsResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: SessionCardMeta[] };
export type SingleSessionRes =
  | GeneralApiProblem
  | { kind: "ok"; data: SessionCardMeta };
export type ForgetPasswordRes = SuccessBase | GeneralApiProblem;

// ORGANIZATION
export type fetchOrganizationTeamRes =
  | { kind: "ok"; data: { users: Array<TeamMember> } }
  | GeneralApiProblem;
export type InviteTeamMemberRes =
  | { kind: "ok"; data: { message: string } }
  | GeneralApiProblem;
