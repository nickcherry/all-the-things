import { Entypo } from '@expo/vector-icons';
import { FC, memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '~/component/text/Text';
import { defaultHitSlop } from '~/constant/pressable';
import { useLists } from '~/context/ListProvider';
import { useTheme } from '~/context/ThemeProvider';
import { useCurrentList } from '~/hook/list/useCurrentList';
import { useCloseDrawer } from '~/hook/navigation/useCloseDrawer';
import { useNavigateToNestedStackScreen } from '~/hook/navigation/useNavigateToNestedStackScreen';
import { List } from '~/type/list';

type ListListProps = {
  isFirstList: boolean;
  list: List;
};

const ListList: FC<ListListProps> = memo(({ isFirstList, list }) => {
  const { t } = useTheme();
  const currentList = useCurrentList();
  const { saveCurrentListId } = useLists();
  const navigate = useNavigateToNestedStackScreen();
  const closeDrawer = useCloseDrawer();

  return (
    <Pressable
      onPress={() => {
        saveCurrentListId({ id: list.id });
        closeDrawer();
      }}
    >
      <View
        style={[
          !isFirstList && [t.borderDefault, t.borderTHairline],
          t.flexRow,
          t.justifyBetween,
          t.itemsCenter,
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            t.textLg,
            t.pY4,
            t.flexShrink,
            list.id === currentList.id && t.fontSemibold,
          ]}
        >
          {list.name}
        </Text>
        <Pressable
          style={[t.flexShrink0, t.mL4]}
          hitSlop={defaultHitSlop}
          onPress={() => {
            navigate('EditList', { list });
          }}
        >
          <Entypo name="edit" size={16} style={[t.textMuted]} />
        </Pressable>
      </View>
    </Pressable>
  );
});

ListList.displayName = 'ListList';

export { ListList };
