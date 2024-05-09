import { FC, memo, useCallback, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';

import { RemoveButton } from '~/component/button/RemoveButton';
import { SaveButton } from '~/component/button/SaveButton';
import { isSmallScreen } from '~/constant/dimension';
import { useLists } from '~/context/ListProvider';
import { useTheme } from '~/context/ThemeProvider';
import { usePop } from '~/hook/navigation/usePop';
import { List } from '~/type/list';

import { NameInput } from './NameInput';
import { SortItemsByInput } from './SortItemsByInput';

type ListFormProps = {
  isNew: boolean;
  list: List;
};

const ListForm: FC<ListFormProps> = memo(({ isNew, list }) => {
  const { t } = useTheme();
  const pop = usePop();

  const {
    currentListId,
    lists: listsObject,
    removeList,
    saveList,
    saveCurrentListId,
  } = useLists();

  const [name, setName] = useState(list.name);
  const [sortItemsBy, setSortItemsBy] = useState(list.sortItemsBy);

  const listIds = useMemo(() => Object.keys(listsObject), [listsObject]);

  const save = useCallback(async () => {
    await saveList({ list: { ...list, name, sortItemsBy } });
    await saveCurrentListId({ id: list.id });
    pop();
  }, [list, name, pop, saveCurrentListId, saveList, sortItemsBy]);

  const remove = useCallback(async () => {
    Alert.alert(
      'Are you sure?',
      `You are about to remove "${list.name}" and all its items`,
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            if (list.id === currentListId) {
              const index = listIds.indexOf(list.id);
              const nextCurrentListIdIndex =
                index > 0 ? index - 1 : listIds.length - 1;
              saveCurrentListId({ id: listIds[nextCurrentListIdIndex] });
            }
            await removeList({ id: list.id });
            pop();
          },
        },
      ],
    );
  }, [
    currentListId,
    list.id,
    list.name,
    listIds,
    pop,
    removeList,
    saveCurrentListId,
  ]);

  return (
    <View style={[t.flex1, t.justifyBetween, t.pX4, t.pT4]}>
      <View>
        <NameInput name={name} setName={setName} autoFocus={!!isNew} />
        <SortItemsByInput
          sortItemsBy={sortItemsBy}
          setSortItemsBy={setSortItemsBy}
        />
      </View>
      <View style={[isSmallScreen && t.pB2]}>
        {!isNew && listIds.length > 1 && (
          <RemoveButton
            label="Remove list"
            style={[t.z10, t.mB5]}
            onPress={remove}
          />
        )}
        <SaveButton onPress={save} />
      </View>
    </View>
  );
});

ListForm.displayName = 'ListForm';

export { ListForm };
