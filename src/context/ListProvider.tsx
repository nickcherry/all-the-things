import {
  createContext,
  FC,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { defaultSortItemsBy } from '~/constant/list';
import { storageKeys } from '~/constant/storage';
import { List, Lists } from '~/type/list';
import { generateUuid } from '~/util/identifier/generateUuid';
import { buildList } from '~/util/list/buildList';
import { storage } from '~/util/storage';

type RemoveList = (params: { id: string }) => Promise<void>;
type SaveList = (params: { list: List }) => Promise<void>;
type SaveCurrentListId = (params: { id: string }) => Promise<void>;

type ListContextValue = {
  currentListId: string;
  lists: Lists;
  removeList: RemoveList;
  saveCurrentListId: SaveCurrentListId;
  saveList: SaveList;
};

const ListContext = createContext<ListContextValue>({
  currentListId: '',
  lists: {},
  removeList: async () => undefined,
  saveCurrentListId: async () => undefined,
  saveList: async () => undefined,
});

type ListProviderProps = {
  children: ReactNode;
};

const initialLists: Lists = JSON.parse(
  storage.getString(storageKeys.lists) || JSON.stringify({}),
);

for (const listId in initialLists) {
  initialLists[listId] = buildList({ list: initialLists[listId] });
}

if (Object.keys(initialLists).length === 0) {
  const list: List = {
    id: generateUuid(),
    name: 'Default list',
    sortItemsBy: defaultSortItemsBy,
    historicNumItemsAdded: 0,
  };
  initialLists[list.id] = list;
}

const initialCurrentListId =
  storage.getString(storageKeys.currentListId) || Object.keys(initialLists)[0];

const ListProvider: FC<ListProviderProps> = memo(({ children }) => {
  const [lists, setLists] = useState(initialLists);
  const [currentListId, setCurrentListId] = useState(initialCurrentListId);

  const saveList: SaveList = useCallback(async ({ list }) => {
    setLists((prevLists) => ({
      ...prevLists,
      [list.id]: list,
    }));
  }, []);

  const removeList: RemoveList = useCallback(async ({ id }) => {
    setLists((prevLists) => {
      const nextLists = { ...prevLists };
      delete nextLists[id];
      return nextLists;
    });
  }, []);

  const saveCurrentListId: SaveCurrentListId = useCallback(async ({ id }) => {
    setCurrentListId(id);
  }, []);

  const value = useMemo(
    () => ({ currentListId, lists, removeList, saveCurrentListId, saveList }),
    [currentListId, lists, removeList, saveCurrentListId, saveList],
  );

  useEffect(() => {
    storage.set(storageKeys.lists, JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    storage.set(storageKeys.currentListId, currentListId);
  }, [currentListId]);

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
});

ListProvider.displayName = 'ListProvider';

function useLists() {
  return useContext(ListContext);
}

export { ListProvider, useLists };
