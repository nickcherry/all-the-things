/* eslint-disable no-console */
import chalk from 'chalk';
import minimist from 'minimist';

import { ReleaseChannel, releaseProfiles } from '~/type/deploy';

import {
  ensureCleanBranch,
  maybeCheckoutMain,
  pullLatest,
  reinstallDependencies,
  runWithInheritedIo,
  typecheck,
} from './shared';

const args = minimist<{
  skipNuke?: 'true' | 'false';
  platform: 'ios' | 'android';
  profile: ReleaseChannel;
}>(process.argv.slice(2));

if (!['ios', 'android'].includes(args.platform)) {
  throw new Error("Platform must be either 'ios' or 'android'");
}
const platformName = args.platform === 'ios' ? 'iOS' : 'Android';

if (!releaseProfiles.includes(args.profile)) {
  throw new Error(`Profile must be one of: ${releaseProfiles.join(', ')}`);
}

async function build() {
  console.log(`Building ${args.profile} bundle for ${platformName}`);
  runWithInheritedIo(`NODE_ENV=production bunx expo prebuild --clean`);
  runWithInheritedIo(
    `NODE_ENV=production bunx eas build --platform ${args.platform} --profile ${args.profile}`,
  );
  console.log(
    chalk.yellow(`\nBuilt ${args.profile} bundle for ${platformName}\n`),
  );
}

(async () => {
  console.log(`Starting ${args.profile} bundle build for ${platformName}`);
  await ensureCleanBranch();
  await maybeCheckoutMain();
  await pullLatest();
  await reinstallDependencies(args.skipNuke === 'true');
  await typecheck();
  await build();
})();
