import { Item, Location } from './item';
import { List } from './list';

export type NoParams = Record<string, never>;

export type NewItemParams = { item: Item };
export type EditItemParams = { item: Item };
export type NewListParams = { list: List };
export type EditListParams = { list: List };
export type LocationParams = {
  location: Location | undefined;
  setLocation: (location: Location | undefined) => void;
};

export type RootStackParamList = {
  Debug: NoParams;
  DebugFeatureFlags: NoParams;
  DebugItems: NoParams;
  DebugNotifications: NoParams;
  EditItem: EditItemParams;
  EditList: EditListParams;
  ExportData: NoParams;
  ImportData: NoParams;
  List: NoParams;
  Location: LocationParams;
  NewItem: NewItemParams;
  NewList: NewListParams;
  Settings: NoParams;
};

export type DrawerParamList = {
  RootStack: NoParams;
};

export type FullParamList = RootStackParamList & DrawerParamList;

export type ScreenName = keyof FullParamList;

export type RootStackScreenName = keyof RootStackParamList;
