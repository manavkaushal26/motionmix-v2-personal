interface MongoBase {
  _id: string;
  __v: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SingleApp extends MongoBase {
  name: string;
  organization: string;
  keys: string[];
}

export interface SingleSession extends MongoBase {
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
