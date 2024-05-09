import { TranslationKey, TranslationScope } from '~/type/translation';

import { translate } from './translate';

function translateOptions<Scope extends TranslationScope>(
  scope: Scope,
  values: TranslationKey<Scope>[],
) {
  return values.map((value) => ({
    label: translate(scope, value),
    value,
  }));
}

export { translateOptions };
