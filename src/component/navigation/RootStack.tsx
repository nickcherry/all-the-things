import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '~/context/ThemeProvider';
import { DebugFeatureFlagsScreen } from '~/screen/DebugFeatureFlagsScreen';
import { DebugItemsScreen } from '~/screen/DebugItemsScreen';
import { DebugNotificationsScreen } from '~/screen/DebugNotificationsScreen';
import { DebugScreen } from '~/screen/DebugScreen';
import { EditItemScreen } from '~/screen/EditItemScreen';
import { EditListScreen } from '~/screen/EditListScreen';
import { ExportDataScreen } from '~/screen/ExportDataScreen';
import { ImportDataScreen } from '~/screen/ImportDataScreen';
import { ListScreen } from '~/screen/ListScreen';
import { LocationScreen } from '~/screen/LocationScreen';
import { NewItemScreen } from '~/screen/NewItemScreen';
import { NewListScreen } from '~/screen/NewListScreen';
import { SettingsScreen } from '~/screen/SettingsScreen';
import { RootStackParamList } from '~/type/navigation';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { colors } = useTheme();

  return (
    <StackNavigator.Navigator
      screenOptions={{
        autoHideHomeIndicator: true,
        gestureEnabled: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.bgScreen },
      }}
    >
      <StackNavigator.Screen
        name="List"
        component={ListScreen}
        options={{
          headerShown: false,
          headerTitle: 'List',
        }}
      />
      <StackNavigator.Screen
        name="NewItem"
        component={NewItemScreen}
        options={{ headerTitle: 'New item' }}
      />
      <StackNavigator.Screen
        name="EditItem"
        component={EditItemScreen}
        options={{ headerTitle: 'Edit item' }}
      />
      <StackNavigator.Screen
        name="NewList"
        component={NewListScreen}
        options={{ headerTitle: 'New list' }}
      />
      <StackNavigator.Screen
        name="EditList"
        component={EditListScreen}
        options={{ headerTitle: 'Edit list' }}
      />
      <StackNavigator.Screen
        name="Location"
        component={LocationScreen}
        options={{ headerTitle: 'Location' }}
      />
      <StackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
      <StackNavigator.Screen
        name="ImportData"
        component={ImportDataScreen}
        options={{ headerTitle: 'Import' }}
      />
      <StackNavigator.Screen
        name="ExportData"
        component={ExportDataScreen}
        options={{ headerTitle: 'Export' }}
      />
      <StackNavigator.Screen
        name="Debug"
        component={DebugScreen}
        options={{ headerTitle: 'Debug' }}
      />
      <StackNavigator.Screen
        name="DebugFeatureFlags"
        component={DebugFeatureFlagsScreen}
        options={{ headerTitle: 'Flags' }}
      />
      <StackNavigator.Screen
        name="DebugItems"
        component={DebugItemsScreen}
        options={{ headerTitle: 'Items' }}
      />
      <StackNavigator.Screen
        name="DebugNotifications"
        component={DebugNotificationsScreen}
        options={{ headerTitle: 'Notifications' }}
      />
    </StackNavigator.Navigator>
  );
};

export { RootStack };
