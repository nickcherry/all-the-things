import * as TaskManager from 'expo-task-manager';

import { sleep } from '~/util/promise/sleep';

const defaultMaxNumAttempts = 5;
const interval = 500;

async function waitForTaskToBeDefined({
  maxNumAttempts = defaultMaxNumAttempts,
  name,
}: {
  name: string;
  maxNumAttempts?: number;
}) {
  let attempts = 0;

  while (!TaskManager.isTaskDefined(name) && attempts++ < maxNumAttempts) {
    await sleep(interval);
  }
}

export { waitForTaskToBeDefined };
