import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { FC, memo, useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';
import { Gesture, GestureDetector, State } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  clamp,
  Easing,
  runOnJS,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import { DecayConfig } from 'react-native-reanimated/lib/typescript/reanimated2/animation/decay/utils';

import { PriorityIndicator } from '~/component/item/common/PriorityIndicator';
import { Due } from '~/component/item/listItem/Due';
import { Notification } from '~/component/item/listItem/Notification';
import { Overdue } from '~/component/item/listItem/Overdue';
import { Recurring } from '~/component/item/listItem/Recurring';
import { Text } from '~/component/text/Text';
import { screenHeight } from '~/constant/dimension';
import { inifiteMaxTapDuration } from '~/constant/gesture';
import { minListItemHeight } from '~/constant/item';
import { useItems } from '~/context/ItemProvider';
import { useTheme } from '~/context/ThemeProvider';
import { usePush } from '~/hook/navigation/usePush';
import { useAnimatedStyle } from '~/hook/reanimated/useAnimatedStyle';
import { Item } from '~/type/item';

const toggleWidth = 84;

const minTranslateX = -toggleWidth;
const maxTranslateX = 0;

const swipeOpenThreshold = -60;

const minSwipeVelocity = 200;
const swipeClamp: DecayConfig['clamp'] = [minTranslateX, maxTranslateX];

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

type ListItemProps = {
  isFirstItem: boolean;
  isLastItem: boolean;
  item: Item;
  shouldFadeIn: boolean;
};

const ListItem: FC<ListItemProps> = memo(
  ({ isFirstItem, isLastItem, item, shouldFadeIn }) => {
    const { t } = useTheme();

    const push = usePush();
    const { removeItem, saveItem } = useItems();

    const isComplete = item.status.name === 'complete';

    const rootOpacity = useSharedValue(shouldFadeIn ? 0 : 1);
    const translateX = useSharedValue(0);
    const restingTranslateX = useSharedValue(0);

    const isFocused = useIsFocused();

    useEffect(() => {
      if (shouldFadeIn) {
        rootOpacity.value = 0;
        rootOpacity.value = withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.circle),
        });
      }
    }, [shouldFadeIn, rootOpacity]);

    const onTapItem = useCallback(() => {
      Haptics.selectionAsync();
      push('EditItem', { item });
    }, [item, push]);

    const onTapToggle = useCallback(() => {
      Haptics.notificationAsync(
        isComplete
          ? Haptics.NotificationFeedbackType.Warning
          : Haptics.NotificationFeedbackType.Success,
      );
      saveItem({
        item: {
          ...item,
          status: isComplete
            ? { name: 'pending' }
            : { name: 'complete', completedAt: Date.now() },
        },
      });
    }, [isComplete, item, saveItem]);

    const onTapRemove = useCallback(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      Alert.alert('Are you sure?', `You are about to remove "${item.name}"`, [
        {
          style: 'cancel',
          text: 'Cancel',
          onPress: () => {
            cancelAnimation(translateX);
            translateX.value = withTiming(0, { duration: 150 });
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            removeItem({ id: item.id });
            cancelAnimation(translateX);
            translateX.value = 0;
          },
        },
      ]);
    }, [item.id, item.name, removeItem, translateX]);

    useEffect(() => {
      if (!isFocused) {
        cancelAnimation(translateX);
        translateX.value = withTiming(0, { duration: 150 });
      }
    }, [isFocused, translateX]);

    const swipeItemGesture = Gesture.Pan()
      .activeOffsetX([-15, 15])
      .onUpdate((e) => {
        translateX.value = clamp(
          restingTranslateX.value + e.translationX,
          minTranslateX,
          maxTranslateX,
        );
      })
      .onEnd((e) => {
        const isOpening = translateX.value < swipeOpenThreshold;
        const velocity =
          Math.max(Math.abs(e.velocityX), minSwipeVelocity) *
          (isOpening ? -1 : 1);
        const [targetX, decayConfig] = isOpening
          ? [minTranslateX, { clamp: swipeClamp, velocity }]
          : [0, { clamp: swipeClamp, velocity }];
        restingTranslateX.value = targetX;
        cancelAnimation(translateX);
        translateX.value = withDecay(decayConfig);
      });

    const tapItemGesture = Gesture.Tap()
      .maxDuration(3000)
      .onFinalize((e) => {
        'worklet';

        if (e.state === State.END) {
          runOnJS(onTapItem)();
        }
      });

    const tapToggleGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .shouldCancelWhenOutside(true)
      .onBegin(() => {
        if (!isComplete) {
          // TODO: cancel animation and transition value to 1
        }
      })
      .onFinalize((e) => {
        // TODO: cancel animation and transition value to 0
        if (e.state === State.END) {
          runOnJS(onTapToggle)();
        }
      });

    const tapRemoveGesture = Gesture.Tap()
      .maxDuration(inifiteMaxTapDuration)
      .onFinalize((e) => {
        if (e.state === State.END) {
          runOnJS(onTapRemove)();
        }
      });

    return (
      <>
        {isLastItem && (
          <View
            style={[
              t.absolute,
              t.bgList,
              t.left0,
              t.right0,
              {
                top: minListItemHeight,
                height: screenHeight + 200,
              },
            ]}
          />
        )}
        <GestureDetector
          gesture={Gesture.Exclusive(swipeItemGesture, tapItemGesture)}
        >
          <Animated.View
            style={[
              t.borderDefault,
              t.borderBHairline,
              useAnimatedStyle(
                () => ({ opacity: rootOpacity.value }),
                [rootOpacity],
              ),
            ]}
          >
            <GestureDetector gesture={tapRemoveGesture}>
              <View
                style={[
                  t.absolute,
                  t.bottom0,
                  t.left0,
                  t.right0,
                  t.top0,
                  t.justifyCenter,
                  t.pX4,
                  t.bgRemoveItem,
                  isFirstItem && t.roundedT3xl,
                ]}
              >
                <Text style={[t.textRight, t.textLight]}>Remove</Text>
              </View>
            </GestureDetector>
            <Animated.View
              style={[
                t.flexRow,
                t.itemsCenter,
                t.justifyBetween,
                isFirstItem && t.roundedT3xl,
                isComplete ? t.bgListItemComplete : t.bgListItem,
                useAnimatedStyle(
                  () => ({
                    transform: [{ translateX: translateX.value }],
                  }),
                  [translateX],
                ),
              ]}
            >
              <View
                style={[
                  t.flexShrink,
                  t.flexRow,
                  t.itemsCenter,
                  t.justifyBetween,
                  { minHeight: minListItemHeight },
                ]}
              >
                <PriorityIndicator priority={item.priority} style={[t.mL4]} />
                <View
                  style={[
                    t.flex,
                    t.flexShrink,
                    t.flexGrow,
                    t.pY5,
                    t.pL3,
                    t.pR2,
                  ]}
                >
                  <Text
                    style={[
                      t.fontRegular,
                      t.textLg,
                      isComplete && t.lineThrough,
                      isComplete ? t.textItemCompleted : t.textDefault,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <View style={[t.flexRow, t.itemsStart]}>
                    <Overdue item={item} />
                    <Due item={item} />
                    <Recurring item={item} />
                    <Notification item={item} />
                  </View>
                </View>
              </View>
              <GestureDetector gesture={tapToggleGesture}>
                <View
                  style={[
                    t.hFull,
                    t.flexShrink0,
                    t.itemsCenter,
                    t.justifyCenter,
                    t.borderLHairline,
                    t.borderDefault,
                    { width: toggleWidth },
                  ]}
                >
                  <AnimatedIonicons
                    name="checkmark-sharp"
                    size={36}
                    style={[isComplete ? t.textItemCompleted : t.textDefault]}
                  />
                </View>
              </GestureDetector>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

ListItem.displayName = 'ListItem';

export { ListItem };
