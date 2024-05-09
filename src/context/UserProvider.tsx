import * as Sentry from '@sentry/react-native';
import { createContext, useContext } from 'react';

import { storageKeys } from '~/constant/storage';
import { User } from '~/type/user';
import { trackError } from '~/util/error/trackError';
import { generateUuid } from '~/util/identifier/generateUuid';
import { storage } from '~/util/storage';

const user: User = (() => {
  const persistedUser = storage.getString(storageKeys.user);
  if (persistedUser) {
    try {
      return JSON.parse(persistedUser);
    } catch (err) {
      trackError(err);
    }
  } else {
    const newUser = { id: generateUuid() };
    storage.set(storageKeys.user, JSON.stringify(newUser));
    return newUser;
  }
})();

Sentry.setUser(user);

type UserContextValue = {
  user: User;
};

const UserContext = createContext<UserContextValue>({
  user: user,
});

function useUser() {
  return useContext(UserContext);
}

export { useUser };
