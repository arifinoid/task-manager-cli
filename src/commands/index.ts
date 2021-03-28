import TaskAction from "../actions";

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
}

export default TasksCommands;
