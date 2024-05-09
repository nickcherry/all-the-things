import { translations } from '~/constant/translation';
import { TranslationKey, TranslationScope } from '~/type/translation';

function translate<Scope extends TranslationScope>(
  scope: Scope,
  key: TranslationKey<Scope>,
) {
  return translations[scope][key];
}

export { translate };
