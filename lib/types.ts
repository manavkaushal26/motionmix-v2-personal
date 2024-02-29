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
