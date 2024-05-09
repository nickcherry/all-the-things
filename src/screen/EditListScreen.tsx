import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ListForm } from '~/component/list/form/ListForm';
import { RootStackParamList } from '~/type/navigation';
import { buildScreen } from '~/util/screen/buildScreen';

type EditListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditList'
>;

const EditListScreen = buildScreen<EditListScreenProps>(
  {},
  ({
    route: {
      params: { list },
    },
  }) => {
    return <ListForm isNew={false} list={list} />;
  },
);

EditListScreen.displayName = 'EditListScreen';

export { EditListScreen };
