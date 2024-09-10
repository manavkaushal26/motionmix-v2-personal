"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const GlobalProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {/* <SWRConfig
        value={{
          refreshInterval: 10000,
          fetcher: (resource: any, init: any) => {
            const baseUrl = config.apiBaseUrl;
            const endPoint = baseUrl + resource.url;
            return fetch(
              endPoint,
              resource?.args?.token
                ? { headers: { token: resource.args.token } }
                : init
            ).then((res) => res.json());
          },
        }}
      > */}
      {children}
      {/* </SWRConfig> */}
    </SessionProvider>
  );
};

export default GlobalProvider;
