import { FC, memo, useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RemoveButton } from '~/component/button/RemoveButton';
import { SaveButton } from '~/component/button/SaveButton';
import { isSmallScreen } from '~/constant/dimension';
import { useItems } from '~/context/ItemProvider';
import { useTheme } from '~/context/ThemeProvider';
import { useBottomSheet } from '~/hook/bottomsheet/useBottomSheet';
import { usePop } from '~/hook/navigation/usePop';
import { Item } from '~/type/item';

import { DueInput } from './due/DueInput';
import { NameInput } from './NameInput';
import { PriorityInput } from './PriorityInput';
import { StatusInput } from './StatusInput';

type ItemFormProps = {
  isNew: boolean;
  item: Item;
};

const ItemForm: FC<ItemFormProps> = memo(({ isNew, item }) => {
  const { t } = useTheme();
  const pop = usePop();

  const [name, setName] = useState(item.name);
  const [priority, setPriority] = useState(item.priority);
  const [due, setDue] = useState(item.due);

  const [status, setStatus] = useState(item.status);
  const { removeItem, saveItem } = useItems();

  const { bottomSheet, setBottomSheetContent } = useBottomSheet();

  const isValid = !!name.trim();

  const save = useCallback(async () => {
    const now = Date.now();

    await saveItem({
      item: {
        ...item,
        name: name.trimEnd().replace(/\s+/g, ' ').replace('\n', ''),
        priority,
        due,
        status,
        createdAt: isNew ? now : item.createdAt,
        updatedAt: now,
      },
    });

    pop();
  }, [due, isNew, item, name, pop, priority, saveItem, status]);

  const remove = useCallback(() => {
    Alert.alert('Are you sure?', `You are about to remove "${item.name}"`, [
      {
        style: 'cancel',
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          removeItem({ id: item.id });
          pop();
        },
      },
    ]);
  }, [item.id, item.name, pop, removeItem]);

  return (
    <>
      <View style={[t.pT2, t.flex1, t.justifyBetween]}>
        <ScrollView style={[t.pX4]} overScrollMode="never" bounces={false}>
          <NameInput name={name} setName={setName} style={[t.mB4]} />
          <PriorityInput priority={priority} setPriority={setPriority} />
          <DueInput
            due={due}
            setBottomSheetContent={setBottomSheetContent}
            setDue={setDue}
          />
          {!isNew && !isSmallScreen && (
            <StatusInput status={status} setStatus={setStatus} />
          )}
        </ScrollView>
        <View style={[t.pX4, isSmallScreen && t.pB2]}>
          {!isNew && (
            <RemoveButton
              label="Remove item"
              style={[t.z10, t.mB5]}
              onPress={remove}
            />
          )}
          <SaveButton onPress={save} disabled={!isValid} />
        </View>
      </View>
      {bottomSheet}
    </>
  );
});

ItemForm.displayName = 'ItemForm';

export { ItemForm };
