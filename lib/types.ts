interface MongoBase {
  _id: string;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppMeta extends MongoBase {
  name: string;
  organization: string;
  keys: Array<string>;
}

export interface SessionMeta extends MongoBase {
  appScene: {
    _id: string;
    name: string;
  };
  device: {
    name: string;
    type: string;
  };
  dataInterval: number;
  sdkVersion: string;
  appVersion: {
    _id: string;
    name: string;
  };
  sessionTime: number;
}

export interface SingleError extends MongoBase {
  app: string;
  code: string;
  name: string;
  session: string;
  count: number;
  trace?: string;
}
