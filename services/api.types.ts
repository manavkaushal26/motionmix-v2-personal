import { User, Version } from "@utils/types";
import { GeneralApiProblem } from "./apiProblem";

interface AppBase {
  _id: string;
  name: string;
}
export interface AppMeta extends AppBase {
  createdAt: string;
  updatedAt: string;
  organization: string;
  keys: Array<string>;
}
export interface SceneMeta {
  _id: string;
  name: string;
  ply: string;
  createdA: string;
  updatedAt: string;
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
}

export interface PositionTransform {
  x: number;
  y: number;
  z: number;
  time: string;
  _id: string;
}

export type HeatMapRes =
  | GeneralApiProblem
  | { kind: "ok"; data: Array<PositionTransform> };

export type getAllAppsResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: Array<AppMeta> };

export type CreateAppResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: AppMeta };
export type AllSceneResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: SceneMeta[] };

export type AllSessionsResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: SessionBase[] };
export type AllVersionsResponse =
  | GeneralApiProblem
  | { kind: "ok"; data: Version[] };

export type SingleSessionRes =
  | GeneralApiProblem
  | { kind: "ok"; data: SessionMeta };

export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

export interface InviteUser {
  message: string;
}

export type SingleAppRes = { kind: "ok"; data: AppMeta } | GeneralApiProblem;
export type InviteUserRes =
  | { kind: "ok"; data: InviteUser }
  | GeneralApiProblem;
export type FetchOrgUsersRes =
  | { kind: "ok"; data: Array<User> }
  | GeneralApiProblem;

export type SuccessBase = { kind: "ok" };
export type CreateAppRes = SuccessBase | GeneralApiProblem;
export type ForgetPasswordRes = SuccessBase | GeneralApiProblem;
