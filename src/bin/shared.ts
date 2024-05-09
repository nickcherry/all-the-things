/* eslint-disable no-console */
import chalk from 'chalk';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import { normalize } from 'path';
import SimpleGit from 'simple-git';

export const ROOT_DIR = normalize(`${__dirname}/../..`);

const YES = 'Yes';
const NO = 'No';
const SKIP_NUKE = 'skipNuke';

const MAIN = 'main';

const SWITCH_BRANCH = 'switch_branch';

export const git = SimpleGit({
  baseDir: ROOT_DIR,
});

export function runWithInheritedIo(command: string): void {
  execSync(command, {
    cwd: ROOT_DIR,
    encoding: 'utf-8',
    stdio: 'inherit',
  });
}

export async function ensureCleanBranch() {
  const status = await git.status();

  if (!status.isClean()) {
    console.error(
      chalk.red.bold(
        '\nThe current branch is not clean. Please stash or commit your changes.\n',
      ),
    );
    process.exit(1);
  }
}

export async function maybeCheckoutMain() {
  const { current: currentBranch } = await git.branch();

  if (currentBranch !== MAIN) {
    const switchBranchResult = await inquirer.prompt({
      name: SWITCH_BRANCH,
      type: 'list',
      message: `You are not on the ${MAIN} branch. Would you like to switch to ${MAIN}?`,
      choices: [YES, NO],
      default: YES,
    });

    if (switchBranchResult[SWITCH_BRANCH] === YES) {
      console.log(chalk.yellow(`\nSwitching to ${MAIN} branch...`));
      await git.checkout(MAIN);
    }
  }
}

export async function pullLatest() {
  const { current: currentBranch } = await git.branch();

  console.log(chalk.yellow(`Pulling latest from ${currentBranch}...`));
  await git.pull('origin', currentBranch, { '--no-rebase': null });

  const localRef = await git.revparse([currentBranch]);
  const remoteRef = await git.revparse([`origin/${currentBranch}`]);

  if (localRef !== remoteRef) {
    console.error(
      chalk.red(
        `\nLatest commmit differs between local and remote. Please push your changes.\n`,
      ),
    );
    process.exit(1);
  }
}

export async function reinstallDependencies(skipNuke: boolean) {
  let shouldSkipNuke = false;

  if (skipNuke) {
    const skipNukeResponse = await inquirer.prompt({
      name: SKIP_NUKE,
      type: 'list',
      message: `Are you sure you want to skip nuking modules? This can be dangerous.`,
      choices: [YES, NO],
      default: NO,
    });

    shouldSkipNuke = skipNukeResponse[SKIP_NUKE] === YES;
  }

  if (shouldSkipNuke) {
    console.log(chalk.yellow('\nSkipping nuking modules...'));
  } else {
    console.log(chalk.yellow('\nNuking node_modules...'));
    runWithInheritedIo('rm -rf node_modules'); // We want to run this command from the monorepo root, so it nukes ALL node modules, not just those for the mobile app.
  }

  console.log(chalk.yellow('Reinstalling dependencies...'));
  runWithInheritedIo('bun install');
}

export async function typecheck() {
  console.log(chalk.yellow('Typechecking...'));
  runWithInheritedIo('bun typecheck');
}
