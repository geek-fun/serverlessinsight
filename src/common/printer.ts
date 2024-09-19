import chalk from 'chalk';

export const printer = {
  success: (message: string) =>
    console.log(`${chalk.blue('ServerlessInsight')}: ${chalk.green(message)}`),
  info: (message: string) => console.log(`${chalk.blue('ServerlessInsight')}: ${message}`),
  error: (message: string) =>
    console.log(`${chalk.bgRed(chalk.black('ServerlessInsight'))}: ${chalk.red(message)}`),
};
