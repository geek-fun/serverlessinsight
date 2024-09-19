import chalk from 'chalk';

export const printer = {
  success: (message: string) =>
    console.log(`${chalk.bgYellow(chalk.black('ServerlessInsight'))}: ${chalk.green(message)}`),
  error: (message: string) =>
    console.log(`${chalk.bgRed(chalk.black('ServerlessInsight'))}: ${chalk.red(message)}`),
};
