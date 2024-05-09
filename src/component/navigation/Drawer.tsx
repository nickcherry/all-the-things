import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from '~/component/navigation/DrawerContent';
import { useDrawer } from '~/context/DrawerProvider';
import { DrawerParamList } from '~/type/navigation';

import { RootStack } from './RootStack';

const DrawerNavigator = createDrawerNavigator<DrawerParamList>();

const Drawer = () => {
  const { swipeEdgeEnabled } = useDrawer();

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerStyle: [{ width: '80%' }],
        drawerType: 'slide',
        headerShown: false,
        swipeEdgeWidth: swipeEdgeEnabled ? 38 : 0, // https://github.com/react-navigation/react-navigation/blob/901cd111c0db641287c32b5f2c535473f3d7e5c5/packages/react-native-drawer-layout/src/constants.tsx#L1
      }}
    >
      <DrawerNavigator.Screen name="RootStack" component={RootStack} />
    </DrawerNavigator.Navigator>
  );
};

export { Drawer };
