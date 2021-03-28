import { PouchyStore } from "fajri-pouchy-store";
import config, { ICouchDB } from "../config";

export class TaskStore extends PouchyStore {
  get name(): string {
    return config.name!;
  }

  get urlRemote(): string {
    return config.couchDBUrl;
  }

  get optionsRemote(): ICouchDB {
    return {
      auth: config.couchDBAuth,
    };
  }
}
