import { PouchyStore } from "pouchy-store";
import config, { ICouchDB } from "../config";

export default class TaskStore extends PouchyStore {
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
