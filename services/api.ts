import { auth } from "@/lib/authOptions";
import { config } from "@/lib/globalConfig";
import { AppMeta } from "@/lib/types";
import { ApisauceInstance, create } from "apisauce";
import { signOut } from "next-auth/react";
import * as Types from "./api.types";
import { getGeneralApiProblem } from "./apiProblem";

export const DEFAULT_CONFIG = {
  timeout: 10000, // 10s
  url: config.apiBaseUrl,
};
export class Api {
  apisauce: ApisauceInstance;
  config: Types.ApiConfig;
  constructor(config = DEFAULT_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }

  // APPS START
  async getAllApps(): Promise<Types.getAllAppsResponse> {
    const res: any = await this.apisauce.get("/v1/app");

    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res?.data?.apps };
  }
  async getSingleApp(appId: string): Promise<Types.SingleAppRes> {
    const res = await this.apisauce.get(`/v1/app/${appId}`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res?.data as AppMeta };
  }
  // APPS END

  // SESSIONS START
  async getAllSessions(
    appId: string,
    sceneId: string,
    limit: number = 9,
    skip: number = 0
  ): Promise<Types.AllSessionsResponse> {
    const res = await this.apisauce.get(
      `v1/app/${appId}/scene/${sceneId}/session?limit=${limit}&skip=${skip}`
    );
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res?.data as Types.SessionBase[] };
  }
  async getAllSessionsByAppId(
    appId: string,
    limit: number = 32,
    skip: number = 0
  ): Promise<Types.AllSessionsResponse> {
    const res: any = await this.apisauce.get(
      `/v1/app/${appId}/session?limit=${limit}&skip=${skip}`
    );
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return {
      kind: "ok",
      data: res?.data?.sessions,
    };
  }
  async getSingleSession(sessionId: string): Promise<Types.SingleSessionRes> {
    const res = await this.apisauce.get(`/v1/app/session/${sessionId}`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res?.data as Types.SingleSession };
  }
  // SESSIONS END
}

export const api = new Api();
api.apisauce.setBaseURL(config.apiBaseUrl);

api.apisauce.addAsyncRequestTransform((request) => async () => {
  const authSession = await auth();
  const userToken = authSession?.user?.token || request?.headers?.token;
  if (userToken) {
    request.headers!.token = userToken;
  } else {
    delete request.headers!.token;
  }
});

const errorMessages = ["no token found", "jwt malformed", "invalid token"];

api.apisauce.addResponseTransform((response) => {
  if (errorMessages.includes(response?.data?.message?.toLowerCase())) {
    signOut();
  }
});
