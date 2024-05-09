import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AppState } from 'react-native';

import { storageKeys } from '~/constant/storage';
import { Item, Items } from '~/type/item';
import { trackError } from '~/util/error/trackError';
import { buildItem } from '~/util/item/buildItem';
import { cleanUpAndRolloverItems } from '~/util/item/cleanUpAndRolloverItems';
import { getNotificationRequests } from '~/util/item/getNotificationRequests';
import { getStoredItems } from '~/util/item/getStoredItems';
import { hasNotificationsEnabled } from '~/util/item/hasNotificationsEnabled';
import { registerLocationAlerts } from '~/util/location/registerLocationAlerts';
import { requestPushNotificationPermission } from '~/util/notification/requestPushNotificationPermission';
import { storage } from '~/util/storage';

import { useLists } from './ListProvider';
import { useNotifications } from './NotificationProvider';
import { useSettings } from './SettingsProvider';

type RemoveItem = (params: { id: string }) => Promise<void>;
type SaveItem = (params: { item: Item }) => Promise<void>;

type ListContextValue = {
  hasCreatedFirstItem: boolean;
  items: Items;
  forceCleanUp: () => void;
  removeItem: RemoveItem;
  saveItem: SaveItem;
};

const ListContext = createContext<ListContextValue>({
  hasCreatedFirstItem: false,
  items: {},
  forceCleanUp: () => undefined,
  removeItem: async () => undefined,
  saveItem: async () => undefined,
});

type ItemProviderProps = {
  children?: ReactNode;
};

const ItemProvider: FC<ItemProviderProps> = ({ children }) => {
  const { settings } = useSettings();
  const { lists, saveList } = useLists();
  const { removeNotifications, scheduleNotifications } = useNotifications();

  const [items, setItems] = useState<Items>(
    useMemo(
      () =>
        cleanUpAndRolloverItems({
          now: Date.now(),
          settings,
          lists,
          items: Object.entries(getStoredItems()).reduce((memo, [id, item]) => {
            memo[id] = buildItem({ settings, item: item as Item }); // Pass persisted item through `buildTodoItem` to ensure that it has all expected properties.
            return memo;
          }, {} as Items),
        }),
      [lists, settings],
    ),
  );

  const [hasCreatedFirstItem, setHasCreatedFirstItem] = useState(
    useMemo(
      (): boolean =>
        storage.getBoolean(storageKeys.hasCreatedFirstItem) || false,
      [],
    ),
  );

  const saveItem: SaveItem = useCallback(
    async ({ item }) => {
      setItems((prevItems) => {
        const list = lists[item.listId];

        if (list && !prevItems[item.id]) {
          saveList({
            list: {
              ...list,
              historicNumItemsAdded: list.historicNumItemsAdded + 1,
            },
          });
        }

        return cleanUpAndRolloverItems({
          now: Date.now(),
          items: { ...prevItems, [item.id]: item },
          lists,
          settings,
        });
      });

      if (!hasCreatedFirstItem) {
        setHasCreatedFirstItem(true);
        storage.set(storageKeys.hasCreatedFirstItem, true);
      }

      try {
        await removeNotifications({ key: item.id });

        if (hasNotificationsEnabled(item.due)) {
          requestPushNotificationPermission({ delay: 750 });

          await scheduleNotifications({
            key: item.id,
            requests: getNotificationRequests({ item, settings }),
          });
        }
      } catch (error) {
        trackError(error);
      }
    },
    [
      hasCreatedFirstItem,
      lists,
      removeNotifications,
      saveList,
      scheduleNotifications,
      settings,
    ],
  );

  const removeItem: RemoveItem = useCallback(
    async ({ id }) => {
      setItems((prevItems) => {
        const nextItems = { ...prevItems };
        delete nextItems[id];
        return nextItems;
      });

      await removeNotifications({ key: id });
    },
    [removeNotifications],
  );

  const forceCleanUp = useCallback(() => {
    setItems(
      cleanUpAndRolloverItems({
        now: Date.now(),
        forceImmediateCleanup: true,
        items,
        lists,
        settings,
      }),
    );
  }, [items, lists, settings]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (appState) => {
      if (appState === 'active') {
        setItems(
          cleanUpAndRolloverItems({ now: Date.now(), items, lists, settings }),
        );
      }
    });

    return () => {
      subscription.remove();
    };
  }, [items, lists, settings]);

  useEffect(() => {
    storage.set(storageKeys.items, JSON.stringify(items));
    registerLocationAlerts({ items: Object.values(items) });
  }, [items]);

  const value = useMemo(
    () => ({
      hasCreatedFirstItem,
      items,
      forceCleanUp,
      removeItem,
      saveItem,
    }),
    [hasCreatedFirstItem, items, forceCleanUp, removeItem, saveItem],
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

ItemProvider.displayName = 'ItemProvider';

function useItems() {
  return useContext(ListContext);
}

export { ItemProvider, useItems };
