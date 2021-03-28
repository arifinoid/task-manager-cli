#!/usr/bin/env node
import * as dotenv from "dotenv";
import program, { CommanderStatic } from "commander";

import TasksCommands, { Command } from "../commands";
import config from "../config";
import { generateMessage, handleInvalidCommand } from "../utils";

dotenv.config({ path: __dirname + "/.env" });

class Main {
  program: CommanderStatic;
  commands: TasksCommands;

  constructor() {
    this.program = program;
    this.commands = new TasksCommands();
  }

  async start() {
    this.program
      .version(config.version!, "-v, --version")
      .description(generateMessage("eFishery - Task Manager CLI"));

    this.commands.availableCommands.map((command: Command) =>
      this.registerCommand(command)
    );
  }

  registerCommand(commandData: Command) {
    const { command, alias, description, action } = commandData;

    this.program
      .command(command)
      .alias(alias)
      .description(description)
      .action(action);
  }

  async run() {
    await this.start();
    this.program.on("command:*", () => handleInvalidCommand(program));
    this.program.parse(process.argv);
  }
}

const main = new Main();
main.run();
