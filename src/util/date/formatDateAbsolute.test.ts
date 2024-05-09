import { describe, expect, it } from 'bun:test';

import { formatDateAbsolute } from '~/util/date/formatDateAbsolute';

describe('formatDateAbsolute', () => {
  it('should format the date', () => {
    expect(
      formatDateAbsolute({
        now: new Date(new Date().setUTCFullYear(2024)),
        date: new Date(new Date().setFullYear(2024, 0, 1)),
      }),
    ).toEqual('Jan 1st');

    expect(
      formatDateAbsolute({
        now: new Date(new Date().setUTCFullYear(2023)),
        date: new Date(new Date().setFullYear(1986, 9, 24)),
      }),
    ).toEqual('Oct 24th, 1986');
  });
});
