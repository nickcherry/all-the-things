import { FlashList } from '@shopify/flash-list';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ListEmpty } from '~/component/empty/ListEmpty';
import { ListItem } from '~/component/item/listItem/ListItem';
import { CreateFirstItemPrompt } from '~/component/list/CreateFirstItemPrompt';
import { Text } from '~/component/text/Text';
import { useItems } from '~/context/ItemProvider';
import { useSettings } from '~/context/SettingsProvider';
import { useTheme } from '~/context/ThemeProvider';
import { useListItems } from '~/hook/item/useListItems';
import { useCurrentList } from '~/hook/list/useCurrentList';
import { useNumLists } from '~/hook/list/useNumLists';
import { Item } from '~/type/item';
import { getDifference } from '~/util/set/getDifference';

const List: FC = memo(() => {
  const { t } = useTheme();
  const insets = useSafeAreaInsets();
  const { colors, sizes } = useTheme();
  const { settings } = useSettings();
  const currentList = useCurrentList();
  const numLists = useNumLists();
  const { forceCleanUp, hasCreatedFirstItem } = useItems();

  const items = useListItems({ list: currentList });
  const prevItemsRef = useRef(items);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const ref = useRef<FlashList<Item>>(null);

  const renderItem = useCallback(
    ({ index, item }: { index: number; item: Item }) => {
      return (
        <ListItem
          isFirstItem={index === 0}
          isLastItem={index === items.length - 1}
          item={item}
          shouldFadeIn={item.createdAt > Date.now() - 2000}
        />
      );
    },
    [items.length],
  );

  const keyExtractor = useCallback((item: Item) => item.id, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      forceCleanUp();
      setIsRefreshing(false);
    }, 1000);
  }, [forceCleanUp]);

  const listHeader = useMemo(() => {
    if (numLists > 1) {
      return (
        <Text
          style={[
            t.textXs,
            t.textLight,
            t.opacity75,
            t.fontSemibold,
            t.textCenter,
            t.pB2,
          ]}
        >
          {currentList.name}
        </Text>
      );
    }

    return null;
  }, [numLists, currentList, t]);

  useEffect(() => {
    if (ref.current) {
      const prevItemIds = new Set(prevItemsRef.current.map((item) => item.id));
      const itemIds = new Set(items.map((item) => item.id));
      const diff = getDifference(prevItemIds, itemIds);
      if (diff.length === 1) {
        const index = items.findIndex((item) => item.id === diff[0]);
        if (index !== -1) {
          ref.current.scrollToIndex({
            animated: true,
            index: Math.max(0, index - 1),
          });
        }
      }
    }

    prevItemsRef.current = items;
  }, [items]);

  if (items.length === 0) {
    if (!hasCreatedFirstItem) {
      return <CreateFirstItemPrompt />;
    } else {
      return (
        <>
          {listHeader && (
            <View
              style={[
                t.absolute,
                t.left0,
                t.right0,
                t.top0,
                { marginTop: insets.top },
              ]}
            >
              {listHeader}
            </View>
          )}
          <ListEmpty>
            {currentList.historicNumItemsAdded > 0
              ? '🎉 Your list is empty 🎉'
              : `Add an item to your new list`}
          </ListEmpty>
        </>
      );
    }
  }
  return (
    <FlashList
      ListHeaderComponent={listHeader}
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={84}
      ref={ref}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: 88,
        paddingHorizontal: sizes.s4,
      }}
      refreshControl={
        settings.cleanUpAfterCompleted === 'never' ? undefined : (
          <RefreshControl
            tintColor={colors.tintRefresh}
            progressViewOffset={46}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        )
      }
    />
  );
});

List.displayName = 'List';

export { List };
