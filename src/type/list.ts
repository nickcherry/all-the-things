export type SortItemsBy = 'alphabetically' | 'priority' | 'due' | 'created';

export type List = {
  id: string;
  name: string;
  historicNumItemsAdded: number;
  sortItemsBy: SortItemsBy;
};

export type Lists = Record<string, List>;
