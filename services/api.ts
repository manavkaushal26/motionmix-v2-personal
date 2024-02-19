import { config } from "@/lib/globalConfig";
import { ApiResponse, ApisauceInstance, create } from "apisauce";
import { getSession, signOut } from "next-auth/react";
import * as Types from "./api.types";
import { getGeneralApiProblem } from "./apiProblem";

export const DEFAULT_CONFIG = {
  timeout: 10000,
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

  //! <-- FETCH FUNCTIONS -->
  // DASHBOARD FETCH FUNCTIONS
  async createApp(name: string): Promise<Types.CreateAppResponse> {
    const res = await this.apisauce.post("v1/app", { name });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    return { kind: "ok", data: rawRes };
  }
  async getAllApps(): Promise<Types.getAllAppsResponse> {
    const res = await this.apisauce.get("v1/app");
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    const data = rawRes?.apps?.map((item) => {
      return {
        _id: item?._id,
        name: item?.name,
        createdAt: item?.createdAt,
        updatedAt: item?.updatedAt,
        organization: item?.organization,
      };
    });
    return { kind: "ok", data };
  }
  async getSingleApp(appId: string): Promise<Types.SingleAppRes> {
    const res = await this.apisauce.get(`v1/app/${appId}`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    const data = {
      _id: rawRes?._id as string,
      name: rawRes?.name as string,
      keys: [...rawRes?.keys],
      createdAt: rawRes?.createdAt,
      updatedAt: rawRes?.updatedAt,
      organization: rawRes?.organization,
    };
    return { kind: "ok", data };
  }
  async getAllScenesForApp(
    appId: string,
    version: string
  ): Promise<Types.AllSceneResponse> {
    const res = await this.apisauce.get(`v2/app/${appId}/${version}/scene`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    const sceneData = (rawRes?.scenes || []).map((scene) => {
      return {
        _id: scene?._id || "",
        name: scene?.name || "",
        ply: scene?.ply || "",
        createdAt: scene?.createdAt || "",
        updatedAt: scene?.updatedAt || "",
      };
    });
    return { kind: "ok", data: sceneData };
  }
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
    const rawRes: any = res?.data;
    const sessionData = (rawRes?.sessions || []).map((session) => {
      return {
        _id: session?._id || "",
        createdAt: session?.createdAt || "",
        updatedAt: session?.updatedAt || "",
        sdkVersion: session?.sdkVersion || "1.0.4",
        totalRecorded: session?.totalRecorded || 0,
      };
    });
    return { kind: "ok", data: sessionData };
  }
  async getSingleSession(sessionId: string): Promise<Types.SingleSessionRes> {
    const res = await this.apisauce.get(`v1/app/session/${sessionId}`);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    return { kind: "ok", data: rawRes };
  }
  async getHeatMapData(
    appId: string,
    sceneId: string,
    startDate: string,
    endDate: string
  ): Promise<Types.HeatMapRes> {
    const res = await this.apisauce.get(
      `v1/app/${appId}/scene/${sceneId}/heatmap?start=${startDate}&end=${endDate}`
    );
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    const data = rawRes?.pointData?.map((item) => {
      return {
        x: item?.x,
        y: item?.y,
        z: item?.z,
        _id: item?._id,
        time: item?.time,
      };
    });
    return { kind: "ok", data };
  }
  async getExitHeatMapData(
    appId: string,
    sceneId: string,
    startDate: string,
    endDate: string
  ): Promise<Types.HeatMapRes> {
    const res = await this.apisauce.get(
      `v1/app/${appId}/scene/${sceneId}/exitHeatmap?start=${startDate}&end=${endDate}`
    );
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    const data = rawRes?.pointData?.map((item) => {
      return {
        x: item?.x,
        y: item?.y,
        z: item?.z,
        _id: item?._id,
        time: item?.time,
      };
    });
    return { kind: "ok", data };
  }
  async getAllVersions(appId: string): Promise<Types.AllVersionsResponse> {
    const res: ApiResponse<{ versions: Version[] }> = await this.apisauce.get(
      `v1/app/${appId}/version`
    );
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const versionData: Version[] = res.data?.versions || [];
    return { kind: "ok", data: versionData };
  }

  // CUSTOMER DASHBOARD
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
  async updateOrgUserDetails(
    id: string,
    data: EditUserFormValues
  ): Promise<any> {
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

  // AUTH FUNCTIONS
  async loginUser(email: string, password: string): Promise<any> {
    const res = await this.apisauce.post("/v1/auth/login", { email, password });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawData = res?.data;
    return { kind: "ok", data: rawData };
  }
  async fetchOrgUsers(): Promise<Types.FetchOrgUsersRes> {
    const res = await this.apisauce.get("v1/user");
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    return { kind: "ok", data: rawRes.users };
  }
  async inviteUser(data): Promise<Types.InviteUserRes> {
    const res = await this.apisauce.post("v1/user", { ...data });
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    const rawRes: any = res?.data;
    return { kind: "ok", data: rawRes };
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
  async verifyCode(data): Promise<Types.ForgetPasswordRes> {
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
  async updateUserDetails(data): Promise<any> {
    const res = await this.apisauce.put("/v1/user", data);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok" };
  }
  async updatePassword(data): Promise<any> {
    const res = await this.apisauce.put("/v1/user/password", data);
    if (!res.ok) {
      const problem = getGeneralApiProblem(res);
      if (problem) return problem;
    }
    return { kind: "ok", data: res.data };
  }
}

export const api = new Api();
api.apisauce.setBaseURL(config.apiBaseUrl);

api.apisauce.addAsyncRequestTransform((request) => async () => {
  const t: any = await getSession();
  if (request?.headers?.token) {
    const userToken = t?.token || request.headers.token;
    if (userToken) {
      request.headers.token = userToken;
    } else {
      delete request.headers.token;
    }
  }
});

const errorMessages = ["no token found", "jwt malformed", "invalid token"];

api.apisauce.addResponseTransform((response) => {
  if (errorMessages.includes(response?.data?.message?.toLowerCase())) {
    signOut();
  }
});
