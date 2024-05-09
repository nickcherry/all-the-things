/* eslint-disable no-console */
import { join } from 'node:path';

import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';
import inquirer from 'inquirer';
import minimist from 'minimist';
import { rimraf } from 'rimraf';

import {
  ensureCleanBranch,
  maybeCheckoutMain,
  pullLatest,
  reinstallDependencies,
  ROOT_DIR,
  runWithInheritedIo,
  typecheck,
} from './shared';

const EAS_PATH = join(ROOT_DIR, 'eas.json');
const RELEASE_CHANNEL = 'release_channel';

const distDir = join(ROOT_DIR, 'dist');

const args = minimist<{ skipNuke?: 'true' | 'false' }>(process.argv.slice(2));

async function chooseReleaseChannel(): Promise<string> {
  console.log(
    `${chalk.yellow(
      `Looking for available release channels in ${EAS_PATH}...`,
    )}\n`,
  );

  const eas = JSON.parse(readFileSync(EAS_PATH, 'utf-8'));
  const internalReleaseChannel = eas.build.internal.channel;
  const prodReleaseChanel = eas.build.production.channel;

  const releaseChannelResult = await inquirer.prompt({
    name: RELEASE_CHANNEL,
    type: 'list',
    message: 'Which release channel would you like to publish?',
    choices: [internalReleaseChannel, prodReleaseChanel],
    default: internalReleaseChannel,
  });

  return releaseChannelResult[RELEASE_CHANNEL];
}

async function publish(releaseChannel: string) {
  console.log(chalk.yellow(`Publishing ${releaseChannel}...`));
  runWithInheritedIo(`bunx eas update --branch=${releaseChannel}`);
  console.log(chalk.yellow(`\nPublished ${releaseChannel}\n`));
}

async function removeDist() {
  if (existsSync(distDir)) {
    console.log(chalk.yellow(`Deleting ${distDir}...`));
    return await rimraf(distDir);
  }
}

(async () => {
  await ensureCleanBranch();
  await maybeCheckoutMain();
  await pullLatest();
  const releaseChannel = await chooseReleaseChannel();
  await reinstallDependencies(args.skipNuke === 'true');
  await typecheck();
  await publish(releaseChannel);
  await removeDist();
})();
