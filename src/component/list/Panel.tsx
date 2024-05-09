import { Entypo, FontAwesome } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { FC, memo, ReactNode, useCallback } from 'react';
import { Pressable, View } from 'react-native';

import { useItems } from '~/context/ItemProvider';
import { useSettings } from '~/context/SettingsProvider';
import { useTheme } from '~/context/ThemeProvider';
import { useCurrentList } from '~/hook/list/useCurrentList';
import { useOpenDrawer } from '~/hook/navigation/useOpenDrawer';
import { usePush } from '~/hook/navigation/usePush';
import { buildItem } from '~/util/item/buildItem';

const sideWidth = 60;

const Panel: FC = memo(() => {
  const { t } = useTheme();
  const { settings } = useSettings();
  const { hasCreatedFirstItem } = useItems();
  const currentList = useCurrentList();

  const push = usePush();
  const openDrawer = useOpenDrawer();

  const addTodo = useCallback(() => {
    Haptics.selectionAsync();

    const item = buildItem({
      settings,
      item: { listId: currentList.id },
    });

    push('NewItem', { item });
  }, [currentList.id, push, settings]);

  return (
    <View
      style={[
        t.absolute,
        t.left0,
        t.right0,
        t.bottom0,
        t.flexRow,
        t.justifyCenter,
        t._mB1,
        {
          height: 54,
        },
      ]}
    >
      <View
        style={[
          hasCreatedFirstItem && [
            t.bgPanel,
            t.roundedT2xl,
            t.borderHairline,
            t.borderPanel,
            {
              shadowColor: 'black',
              shadowOpacity: 0.05,
              shadowRadius: 4,
              shadowOffset: { width: -1, height: -1 },
            },
          ],
          t.flexRow,
          t.justifyEvenly,
          t.itemsCenter,
        ]}
      >
        <SideContent>
          {hasCreatedFirstItem && (
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                openDrawer();
              }}
            >
              {/* Hit slop */}
              <View style={[t.absolute, t.inset0, t._mX7, t._mY5]} />
              <Entypo name="list" size={27} style={[t.textSettingsIcon]} />
            </Pressable>
          )}
        </SideContent>
        <Pressable onPress={addTodo} style={[t.z10]}>
          <View
            style={[
              t.h32,
              t.w32,
              t.justifyCenter,
              t.itemsCenter,
              t.roundedFull,
              t.bgButton,
              t._mT8,
              t.border2,
              t.borderAddItemButton,
              {
                shadowColor: 'black',
                shadowOpacity: 0.1,
                shadowRadius: 4,
                shadowOffset: { width: -1, height: -1 },
              },
            ]}
          >
            <Entypo name="plus" size={46} style={[t.textButton, t._mT2]} />
          </View>
        </Pressable>
        <SideContent>
          {hasCreatedFirstItem && (
            <Pressable
              onPress={() => {
                push('Settings', {});
              }}
            >
              {/* Hit slop */}
              <View style={[t.absolute, t.inset0, t._mX7, t._mY5]} />
              <FontAwesome name="gear" size={24} style={[t.textSettingsIcon]} />
            </Pressable>
          )}
        </SideContent>
      </View>
    </View>
  );
});

Panel.displayName = 'Panel';

type SideContentProps = {
  children?: ReactNode;
};

const SideContent: FC<SideContentProps> = memo(({ children }) => {
  const { t } = useTheme();

  return (
    <View style={[t.itemsCenter, t.justifyCenter, { width: sideWidth }]}>
      {children}
    </View>
  );
});

export { Panel };
