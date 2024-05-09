import { FC, memo, useEffect } from 'react';

import { useSplash } from '~/context/SplashProvider';

const DismissSplash: FC = memo(() => {
  const { hideSplash } = useSplash();

  useEffect(() => {
    hideSplash();
  }, [hideSplash]);

  return null;
});

DismissSplash.displayName = 'DismissSplash';

export { DismissSplash };
