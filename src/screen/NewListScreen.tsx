import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ListForm } from '~/component/list/form/ListForm';
import { RootStackParamList } from '~/type/navigation';
import { buildScreen } from '~/util/screen/buildScreen';

type NewListScreenProps = NativeStackScreenProps<RootStackParamList, 'NewList'>;

const NewListScreen = buildScreen<NewListScreenProps>(
  {},
  ({
    route: {
      params: { list },
    },
  }) => {
    return <ListForm isNew list={list} />;
  },
);

NewListScreen.displayName = 'NewListScreen';

export { NewListScreen };
