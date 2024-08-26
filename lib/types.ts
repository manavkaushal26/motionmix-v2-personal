import { Role } from "./enums";

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
  deleteInProgress?: string;
}

export interface SessionCardMeta extends MongoBase {
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

export interface TeamMember extends MongoBase {
  name: string;
  role: Role;
  isAdmin: boolean;
  organization: string;
  orgRole: string;
  email: string;
  isActive: boolean;
  point: number;
}
