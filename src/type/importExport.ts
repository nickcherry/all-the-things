import { PartialDeep } from 'type-fest';

import { Items } from './item';
import { Lists } from './list';
import { Settings } from './settings';
import { User } from './user';

export type ExportData = {
  currentListId: string;
  hasCreatedFirstItem: boolean;
  items: Items;
  lists: Lists;
  settings: Settings;
  user: User;
};

export type InputData = PartialDeep<ExportData>;
