"use client";

import { config } from "@/lib/globalConfig";
import { AppMeta } from "@/lib/types";
import { ApisauceInstance, create } from "apisauce";
import { getSession, signOut } from "next-auth/react";

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
  async getSingleApp(appId: string): Promise<any> {
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
    return { kind: "ok", data: res?.data as any };
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
    return { kind: "ok", data: res?.data as any };
  }
  // SESSIONS END

  // ERRORS START
  async getErrorStats(appId: string): Promise<any> {
    const res = await this.apisauce.get(`/v1/app/${appId}/error/stats/30D`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res.data };
  }
  async getErrors(appId: string): Promise<any> {
    const res = await this.apisauce.get(`/v1/app/${appId}/error`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res.data };
  }
  async getSingleError(errorId: string): Promise<any> {
    const res = await this.apisauce.get(`/v1/app/error/${errorId}`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res.data };
  }
  // ERRORS END

  // AUTH START
  async loginUser(email: string, password: string): Promise<any> {
    const res = await this.apisauce.post("/v1/auth/login", {
      email,
      password,
    });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res?.data as any };
  }
  async getPasswordResetLink(email: string): Promise<Types.ForgetPasswordRes> {
    const res = await this.apisauce.post("/v1/auth/forgot", {
      email,
    });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok" };
  }
  async verifyCode(data: any): Promise<Types.ForgetPasswordRes> {
    const { userId, code, password } = data;
    const res = await this.apisauce.post("/v1/auth/verify", {
      id: userId,
      code,
      password,
    });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok" };
  }

  async activateUser(id: string): Promise<any> {
    const res = await this.apisauce.put("/v1/user/active/" + id);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    return { kind: "ok", data: rawRes };
  }
  async deactivateUser(id: string): Promise<any> {
    const res = await this.apisauce.put("/v1/user/deactive/" + id);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    return { kind: "ok", data: rawRes };
  }
  async updateTeamMemberDetails(id: string, data: any): Promise<any> {
    const res = await this.apisauce.put("/v1/user/" + id, {
      ...data,
    });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    return { kind: "ok", data: rawRes };
  }
  async getUserDetails(token?: string): Promise<any> {
    const res = await this.apisauce.get("/v1/user/me", undefined, {
      headers: token ? { token: token } : {},
    });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    return { kind: "ok", data: rawRes };
  }
  async updateUserDetails(data: any): Promise<any> {
    const res = await this.apisauce.put("/v1/user", data);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok" };
  }
  async updatePassword(data: any): Promise<any> {
    const res = await this.apisauce.put("/v1/user/password", data);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res.data };
  }
  // AUTH END

  // ORGANIZATION START
  async fetchOrganizationTeam(): Promise<Types.fetchOrganizationTeamRes> {
    const res = await this.apisauce.get("/v1/user");
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res?.data as any };
  }
  // ORGANIZATION END
}

export const api = new Api();
api.apisauce.setBaseURL(config.apiBaseUrl);

api.apisauce.addAsyncRequestTransform((request) => async () => {
  const authSession = await getSession();
  const userToken = authSession?.user?.token || request?.headers?.token;
  if (userToken) {
    request.headers!.token = userToken;
  } else {
    delete request.headers!.token;
  }
});

const errorMessages = ["no token found", "jwt malformed", "invalid token"];
const adminErrorMessages = ["admin only routes"];

api.apisauce.addResponseTransform((response) => {
  if (errorMessages.includes(response?.data?.message?.toLowerCase())) {
    signOut();
  }
  if (adminErrorMessages.includes(response?.data?.message?.toLowerCase())) {
    signOut();
  }
});
