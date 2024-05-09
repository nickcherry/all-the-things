import { FC, memo } from 'react';

import { Switch } from '~/component/switch/Switch';
import { ItemStatus } from '~/type/item';

import { ItemField } from './ItemField';

type StatusInputProps = {
  status: ItemStatus;
  setStatus: (status: ItemStatus) => void;
};

const StatusInput: FC<StatusInputProps> = memo(({ status, setStatus }) => {
  return (
    <ItemField
      label="Complete"
      value={
        <Switch
          value={status.name === 'complete'}
          onValueChange={(isComplete) =>
            setStatus(
              isComplete
                ? { name: 'complete', completedAt: Date.now() }
                : { name: 'pending' },
            )
          }
        />
      }
    />
  );
});

StatusInput.displayName = 'StatusInput';

export { StatusInput };
