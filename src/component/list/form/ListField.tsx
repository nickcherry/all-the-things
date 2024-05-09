import { FC, memo, ReactNode } from 'react';

import { FormField } from '~/component/field/FormField';
import { useTheme } from '~/context/ThemeProvider';

type ListFieldProps = {
  label: ReactNode;
  info?: ReactNode;
  value: ReactNode;
};

const ListField: FC<ListFieldProps> = memo((props) => {
  const { t } = useTheme();

  return <FormField {...props} style={[t.mT6]} />;
});

ListField.displayName = 'ListField';

export { ListField };
