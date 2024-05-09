import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';
import { useCallback } from 'react';
import { Alert, View } from 'react-native';

import { ImportExportButton } from '~/component/button/ImportExportButton';
import { Text } from '~/component/text/Text';
import { useItems } from '~/context/ItemProvider';
import { useLists } from '~/context/ListProvider';
import { useSettings } from '~/context/SettingsProvider';
import { useTheme } from '~/context/ThemeProvider';
import { useUser } from '~/context/UserProvider';
import { usePop } from '~/hook/navigation/usePop';
import { ExportData } from '~/type/importExport';
import { RootStackParamList } from '~/type/navigation';
import { trackError } from '~/util/error/trackError';
import { buildScreen } from '~/util/screen/buildScreen';

type ExportDataScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ExportData'
>;

const ExportDataScreen = buildScreen<ExportDataScreenProps>(
  { insetBottom: true },
  () => {
    const { t } = useTheme();
    const { items, hasCreatedFirstItem } = useItems();
    const { currentListId, lists } = useLists();
    const { user } = useUser();
    const { settings } = useSettings();
    const pop = usePop();

    const onExportPress = useCallback(async () => {
      const data: ExportData = {
        currentListId,
        hasCreatedFirstItem,
        items,
        lists,
        settings,
        user,
      };

      try {
        await Clipboard.setStringAsync(JSON.stringify(data), {
          inputFormat: Clipboard.StringFormat.PLAIN_TEXT,
        });

        Alert.alert(
          'Export successful',
          'Your data has been copied to the clipboard.',
        );
        pop();
      } catch (error) {
        trackError(error);
        Alert.alert("We couldn't export your data.");
      }
    }, [currentListId, hasCreatedFirstItem, items, lists, pop, settings, user]);

    return (
      <View style={[t.flex1, t.pX4, t.justifyBetween]}>
        <View style={[t.flex1, t.justifyCenter]}>
          <Text style={[t.textCenter]}>
            Press the button below to copy your lists, items, and settings to
            the clipboard.
          </Text>
        </View>
        <ImportExportButton onPress={onExportPress}>Export</ImportExportButton>
      </View>
    );
  },
);

ExportDataScreen.displayName = 'ExportDataScreen';

export { ExportDataScreen };
