#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(chalk.magenta`\n  \t\t <<<================================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<=========>>>        ${chalk.bgBlackBright.bold('  Welcome To \"SAM\" - Currency Convertor')}            <<<=========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(chalk.magenta`\t\t <<<================================================>>>`));

console.log(chalk.blue.bold("Welcome to 'SAM' - Currency Convertor!"));

// Function to run the currency convertor
async function main() {
  let runContinue = true;

  while(runContinue){


// Define the list of currencies and their exchange rates
let exchange_rate: any = {
  USD: 1, //Base Currency
  EUR: 0.9, // European Currency(Euro)
  JYP: 113, // Japenese Currency (Yen)
  CAD: 1.3, //Canadian Dollar
  AUD: 1.65, // Australian Dollar
  PKR: 277.7, // Pakistan Rupees
  // Add more currencies and their exchange rates here
};

// Prompt the user to select currencies to convert from and to
let user_answer = await inquirer.prompt([
  {
    name: "from_currency",
    type: "list",
    message: chalk.green("Select the currency to convert from:"),
    choices: ["USD", "EUR", "JYP", "CAD", "AUD", "PKR"],
  },
  {
    name: "to_currency",
    type: "list",
    message: chalk.green("Select the currency to convert into:"),
    choices: ["USD", "EUR", "JYP", "CAD", "AUD", "PKR"],
  },
  {
    name: "amount",
    type: "input",
    message: chalk.green("Enter the amount to convert:"),
    validate: (input) => {
      if (isNaN(input) || input <= 0) {
          return chalk.red("Please enter a valid number greater than 0.");
      }
      return true;
    }
  },
]);

// Perform currency conversion by using formula
let from_amount = exchange_rate[user_answer.from_currency];

let to_amount = exchange_rate[user_answer.to_currency];

let amount = user_answer.amount;

// Formula of conversion
let base_amount = amount / from_amount;
let converted_amount = base_amount * to_amount;

// Display the converted amount
console.log(chalk.blue(`Converted Amount = ${converted_amount.toFixed(2)}`));

const {confirm} =await inquirer.prompt({
  type: "confirm",
  name: "confirm",
  message: chalk.gray("Do you want to convert another currency?"),
  default: false,
});

 runContinue = confirm;
  }
console.log(chalk.cyan("\n\t******************************************************\t"));

console.log(chalk.magenta("\n\tThank you for using the SAM Currency Convertor!\t"));

}
main()