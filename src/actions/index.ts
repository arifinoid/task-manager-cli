import chalk from "chalk";
import ora from "ora";

import BaseAction from "./base.action";

class TaskAction extends BaseAction {
  spinner: ora.Ora;
  isLoading: boolean;

  constructor() {
    super();
    this.spinner = ora(`${chalk.yellow("Loading ..")}`);
    this.isLoading = false;
  }

  setIsLoading(value: boolean) {
    this.spinner = value ? this.spinner.start() : this.spinner.succeed("Done");
    this.isLoading = value;
  }
}

export default TaskAction;
