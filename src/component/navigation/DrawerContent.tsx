import { Entypo } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { FlashList } from '@shopify/flash-list';
import { FC, memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ListList } from '~/component/list/ListList';
import { Subheading } from '~/component/text/Subheading';
import { Text } from '~/component/text/Text';
import { defaultHitSlop } from '~/constant/pressable';
import { useTheme } from '~/context/ThemeProvider';
import { useSortedLists } from '~/hook/item/useSortedLists';
import { useNavigateToNestedStackScreen } from '~/hook/navigation/useNavigateToNestedStackScreen';
import { List } from '~/type/list';
import { buildList } from '~/util/list/buildList';

const DrawerContent: FC<DrawerContentComponentProps> = memo(() => {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const lists = useSortedLists();
  const navigate = useNavigateToNestedStackScreen();

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: List }) => {
      return <ListList list={item} isFirstList={index === 0} />;
    },
    [],
  );

  return (
    <View
      style={[
        t.flex1,
        t.justifyBetween,
        t.pX4,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={[t.flexGrow]}>
        <Subheading style={[t._mB1]}>Your lists</Subheading>
        <FlashList
          data={lists}
          renderItem={renderItem}
          estimatedItemSize={77}
        />
      </View>
      <Pressable
        hitSlop={defaultHitSlop}
        onPress={() => {
          navigate('NewList', { list: buildList({ list: {} }) });
        }}
      >
        <View
          style={[
            t.flexRow,
            t.justifyCenter,
            t.itemsCenter,
            t.bgButton,
            t.p4,
            t.rounded2xl,
          ]}
        >
          <Entypo name="plus" size={18} style={[t.textButton, t.mR1]} />
          <Text style={[t.textButton]}>Add a new list</Text>
        </View>
      </Pressable>
    </View>
  );
});

DrawerContent.displayName = 'DrawerContent';

export { DrawerContent };
