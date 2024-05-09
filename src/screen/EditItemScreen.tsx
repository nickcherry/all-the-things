import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ItemForm } from '~/component/item/form/ItemForm';
import { RootStackParamList } from '~/type/navigation';
import { buildScreen } from '~/util/screen/buildScreen';

type EditItemScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditItem'
>;

const EditItemScreen = buildScreen<EditItemScreenProps>(
  {},
  ({
    route: {
      params: { item },
    },
  }) => {
    return <ItemForm isNew={false} item={item} />;
  },
);

EditItemScreen.displayName = 'EditItemScreen';

export { EditItemScreen };
