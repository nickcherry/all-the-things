import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Clipboard from 'expo-clipboard';
import { useCallback } from 'react';
import { Alert, View } from 'react-native';

import { ImportExportButton } from '~/component/button/ImportExportButton';
import { Text } from '~/component/text/Text';
import { storageKeys } from '~/constant/storage';
import { useItems } from '~/context/ItemProvider';
import { useLists } from '~/context/ListProvider';
import { useRestart } from '~/context/RestartProvider';
import { useSettings } from '~/context/SettingsProvider';
import { useTheme } from '~/context/ThemeProvider';
import { useUser } from '~/context/UserProvider';
import { InputData } from '~/type/importExport';
import { RootStackParamList } from '~/type/navigation';
import { trackError } from '~/util/error/trackError';
import { buildScreen } from '~/util/screen/buildScreen';
import { storage } from '~/util/storage';

type ImportDataScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ImportData'
>;

const ImportDataScreen = buildScreen<ImportDataScreenProps>(
  { insetBottom: true },
  () => {
    const { t } = useTheme();
    const { items } = useItems();
    const { lists } = useLists();
    const { settings } = useSettings();
    const { user } = useUser();

    const { restart } = useRestart();

    const onImportPress = useCallback(async () => {
      const presentError = () => {
        Alert.alert(
          'Import failed',
          'Are you sure the data is copied to the clipboard?',
        );
      };

      try {
        const clipboardText = await Clipboard.getStringAsync();

        if (!clipboardText) {
          presentError();
          return;
        }

        const data: InputData = JSON.parse(
          clipboardText.replace(/[“”]/g, '"').replace(/[‘’]/g, "'"),
        );

        if (!data.lists || !data.items) {
          presentError();
          return;
        }

        if (data.currentListId) {
          storage.set(storageKeys.currentListId, data.currentListId);
        }

        if (data.hasCreatedFirstItem) {
          storage.set(
            storageKeys.hasCreatedFirstItem,
            data.hasCreatedFirstItem,
          );
        }

        storage.set(
          storageKeys.items,
          JSON.stringify({ ...items, ...data.items }),
        );

        storage.set(
          storageKeys.lists,
          JSON.stringify({ ...lists, ...data.lists }),
        );

        storage.set(
          storageKeys.settings,
          JSON.stringify({ ...settings, ...data.settings }),
        );
        storage.set(
          storageKeys.user,
          JSON.stringify({ ...user, ...data.user }),
        );

        restart();
      } catch (error) {
        trackError(error);
        presentError();
      }
    }, [items, lists, restart, settings, user]);

    return (
      <View style={[t.flex1, t.justifyBetween, t.pX4]}>
        <View style={[t.flex1, t.justifyCenter]}>
          <Text style={[t.textCenter]}>
            Make sure the export data has been copied to your clipboard, then
            press the button below.
          </Text>
        </View>
        <ImportExportButton style={[t.mB2]} onPress={onImportPress}>
          Import
        </ImportExportButton>
      </View>
    );
  },
);

ImportDataScreen.displayName = 'ImportDataScreen';

export { ImportDataScreen };
