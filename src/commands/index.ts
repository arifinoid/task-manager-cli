import TaskAction from "../actions";
import { createQestion, completeQuestion, deleteQuestion } from "../lib";

export type Command = {
  command: string;
  alias: string;
  description: string;
  action: (id?: any) => any;
};

class TasksCommands {
  action: TaskAction;
  availableCommands: Command[];

  constructor() {
    this.action = new TaskAction();
    this.availableCommands = [];
  }

  public async registerAction() {
    const commands = [
      {
        command: "list",
        alias: "l",
        description: "Show existing tasks list",
        action: () => this.action.getTasks(),
      },
      {
        command: "create",
        alias: "c",
        description: "Create a task",
        action: () =>
          this.action.askUser(createQestion, (task: { title: string }) =>
            this.action.createTask(task)
          ),
      },
      {
        command: "complete <_id>",
        alias: "co",
        description: "Completing/done a task",
        action: (_id: string) =>
          this.action.askUser(completeQuestion, (res: any) =>
            this.action.completeTask(res, _id)
          ),
      },
      {
        command: "sync",
        alias: "s",
        description: "Syncing & send update task",
        action: () => this.action.syncData(),
      },
      {
        command: "delete <_id>",
        alias: "d",
        description: "Delete a task",
        action: (_id: string) =>
          this.action.askUser(deleteQuestion, (res: any) =>
            this.action.deleteTask(res, _id)
          ),
      },
    ];
    this.availableCommands.push(...commands);
  }
}

export default TasksCommands;
