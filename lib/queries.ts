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