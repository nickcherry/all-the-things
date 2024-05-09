import { defaultSortItemsBy } from '~/constant/list';
import { List } from '~/type/list';
import { generateUuid } from '~/util/identifier/generateUuid';

function buildList({ list }: { list: Partial<List> }): List {
  return {
    id: generateUuid(),
    name: '',
    sortItemsBy: defaultSortItemsBy,
    historicNumItemsAdded: 0,
    ...list,
  };
}

export { buildList };
