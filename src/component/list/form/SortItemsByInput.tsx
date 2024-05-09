import { FC, memo, useMemo } from 'react';
import { Pressable } from 'react-native';

import { Text } from '~/component/text/Text';
import { defaultSortItemsBy } from '~/constant/list';
import { defaultHitSlop } from '~/constant/pressable';
import { useTheme } from '~/context/ThemeProvider';
import { SortItemsBy } from '~/type/list';
import { showActionSheet } from '~/util/actionsheet/showActionSheet';
import { getSelectedOption } from '~/util/settings/getSelectedOption';
import { translateOptions } from '~/util/translation/translateOptions';

import { ListField } from './ListField';

const options = translateOptions('sortStrategy', [
  'alphabetically',
  'created',
  'due',
  'priority',
]);

type SortItemsByInputProps = {
  sortItemsBy: SortItemsBy;
  setSortItemsBy: (sortItemsBy: SortItemsBy) => void;
};

const SortItemsByInput: FC<SortItemsByInputProps> = memo(
  ({ sortItemsBy, setSortItemsBy }) => {
    const { scheme } = useTheme();

    const selectedSortItemsBy = useMemo(
      () =>
        getSelectedOption({
          fallbackIndex: Math.max(
            0,
            options.findIndex((option) => option.value === defaultSortItemsBy),
          ),
          options,
          selectedValue: sortItemsBy,
        }),
      [sortItemsBy],
    );

    return (
      <ListField
        label="Sort items by"
        value={
          <Pressable
            hitSlop={defaultHitSlop}
            onPress={() =>
              showActionSheet({
                options,
                onSelect: (value) => setSortItemsBy(value),
                scheme,
              })
            }
          >
            <Text>{selectedSortItemsBy.label}</Text>
          </Pressable>
        }
      />
    );
  },
);

SortItemsByInput.displayName = 'SortItemsByInput';

export { SortItemsByInput };
