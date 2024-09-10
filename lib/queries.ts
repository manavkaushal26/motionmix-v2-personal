"use server";

import { config } from "./globalConfig";

export const fetchAllApps = async (token: string) => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/v1/app`, {
      method: "GET",
      headers: { token },
    });
    const data = await res.json();

    if (res.ok) {
      return data.apps;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteApp = async (appId: string, token: string) => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/v1/app/${appId}`, {
      method: "DELETE",
      body: JSON.stringify({
        isDelete: true,
      }),
      headers: { token, "Content-Type": "application/json" },
    });
    const resData = await res.json();
    if (res.ok) {
      return resData;
    } else {
      return { message: resData?.message, error: false };
    }
  } catch (error) {
    console.log(error);
  }
};

export const revokeApp = async (appId: string, token: string) => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/v1/app/${appId}`, {
      method: "DELETE",
      body: JSON.stringify({
        isDelete: false,
      }),
      headers: { token, "Content-Type": "application/json" },
    });
    const resData = await res.json();
    if (res.ok) {
      return resData;
    } else {
      return { message: resData?.message, error: false };
    }
  } catch (error) {
    console.log(error);
  }
};
