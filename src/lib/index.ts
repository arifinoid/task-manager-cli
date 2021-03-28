type Question = {
  type: string;
  name: string;
  message: string;
};

export const createQestion: Question[] = [
  {
    type: "input",
    name: "title",
    message: "Enter task title.. ",
  },
];

export const completeQuestion: Question[] = [
  {
    type: "input",
    name: "confirm",
    message: "Confirm complete a task.. (Y/N)",
  },
];

export const deleteQuestion: Question[] = [
  {
    type: "input",
    name: "confirm",
    message: "Confirm delete a task.. (Y/N)",
  },
];
