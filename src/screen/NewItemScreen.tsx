import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ItemForm } from '~/component/item/form/ItemForm';
import { RootStackParamList } from '~/type/navigation';
import { buildScreen } from '~/util/screen/buildScreen';

type NewItemScreenProps = NativeStackScreenProps<RootStackParamList, 'NewItem'>;

const NewItemScreen = buildScreen<NewItemScreenProps>(
  {},
  ({
    route: {
      params: { item },
    },
  }) => {
    return <ItemForm isNew item={item} />;
  },
);

NewItemScreen.displayName = 'NewItemScreen';

export { NewItemScreen };
