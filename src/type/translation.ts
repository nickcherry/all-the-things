import { translations } from '~/constant/translation';

export type Translations = typeof translations;
export type TranslationScope = keyof Translations;
export type TranslationKey<Scope extends TranslationScope = TranslationScope> =
  keyof Translations[Scope];
