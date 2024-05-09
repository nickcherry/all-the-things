import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { Background } from '~/component/list/Background';
import { List } from '~/component/list/List';
import { Panel } from '~/component/list/Panel';
import { useTheme } from '~/context/ThemeProvider';
import { RootStackParamList } from '~/type/navigation';
import { buildScreen } from '~/util/screen/buildScreen';

type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen = buildScreen<ListScreenProps>(
  { background: 'transparent', insetBottom: false },
  () => {
    const { t } = useTheme();

    return (
      <View style={[t.flex1]}>
        <Background />
        <List />
        <Panel />
      </View>
    );
  },
);

ListScreen.displayName = 'ListScreen';

export { ListScreen };
