import commander from "commander";
import TaskStore from "../models/task";

export default class BaseAction {
  program: any;
  store: TaskStore;
  constructor() {
    this.program = new commander.Command();
    this.store = new TaskStore();
  }

  async init() {
    await this.store.initialize();
    await this.store.initializeRemote();
  }

  async terminate() {
    await this.store.deinitialize();
  }
}
