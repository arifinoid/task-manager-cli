import { CommanderStatic } from "commander";
import figlet from "figlet";
import chalk from "chalk";

export const generateMessage = (str: string): string =>
  `${chalk.green(figlet.textSync(str))}`;

export const validation = (res: { confirm: string }) => {
  const proceed: boolean = ["Y", "y"].includes(res.confirm);
  return proceed;
};

export const handleInvalidCommand = (program: CommanderStatic) => {
  console.error(`Invalid command: ${chalk.red("%s")}`, program.args.join(" "));
  console.log(`See ${chalk.red("--help")} for a list of available commands.\n`);
  process.exit(1);
};
