export type CountItemsAndListsEvent = {
  type: 'count-items-and-lists';
  data: { items: number; lists: number };
};

export type AnalyticsEvent = CountItemsAndListsEvent;
