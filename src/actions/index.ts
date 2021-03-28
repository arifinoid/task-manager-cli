import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";

import BaseAction from "./base.action";
import { validation } from "../utils";

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

  async getTasks() {
    this.setIsLoading(true);

    try {
      await this.init();
      const res = await this.store.fetchData();

      if (!res.length) {
        console.log(chalk.green("%s"), "Anda belum memiliki task sama sekali");
        return this.terminate();
      }

      res.map((item: any) =>
        console.log(chalk.green("%s"), {
          text: item.text,
          _id: item._id,
          _rev: item._rev,
          dirtyAt: item.dirtyAt,
          is_complete: item.is_complete || false,
          uploaded: this.store.checkIsUploaded(item),
        })
      );
      console.log(chalk.green("%s"), "Get task completed");
      return this.terminate();
    } catch (error) {
      return error;
    } finally {
      this.setIsLoading(false);
    }
  }

  async askUser(question: any, next: (data: any) => void) {
    try {
      const res: { title?: string; confirm?: string } = await inquirer.prompt(
        question
      );

      if (!Object.values(res)[0]) {
        console.log(chalk.red("%s"), "Please type your answer correctly ...");
        return;
      }

      next(res);
    } catch (error) {
      return error;
    }
  }

  async createTask(task: { title: any }) {
    this.setIsLoading(true);

    try {
      await this.init();

      const payload = { text: task.title, is_complete: false };
      await this.store.addItem(payload);

      console.log(chalk.green("%s"), "Task created");
      return this.terminate();
    } catch (error) {
      return error;
    } finally {
      this.setIsLoading(false);
    }
  }

  async completeTask(res: { confirm: string }, _id: any) {
    const isValid = validation(res);
    if (!isValid) {
      console.log(chalk.red("%s"), "Completing task was canceled");
      return;
    }

    this.setIsLoading(true);

    try {
      await this.init();

      const payload = { is_complete: true };
      await this.store.editItem(_id, payload);

      console.log(chalk.green("%s"), "Task completed");
      return this.terminate();
    } catch (error) {
      return error;
    } finally {
      this.setIsLoading(false);
    }
  }

  async syncData() {
    this.setIsLoading(true);

    try {
      await this.init();
      await this.store.upload();
      return this.terminate();
    } catch (error) {
      return error;
    } finally {
      this.setIsLoading(false);
      console.log(chalk.green("%s"), "Sync task completed");
    }
  }

  async deleteTask(res: { confirm: string }, _id: any) {
    const isValid = validation(res);
    if (!isValid) {
      console.log(chalk.red("%s"), "Deleting task was canceled");
      return;
    }

    this.setIsLoading(true);

    try {
      await this.init();
      await this.store.deleteItem(_id);

      console.log(chalk.green("%s"), "Delete task completed");
      return this.terminate();
    } catch (error) {
      return error;
    } finally {
      this.setIsLoading(false);
    }
  }
}

export default TaskAction;
