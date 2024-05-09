import { describe, expect, it } from 'bun:test';

import { parseDate } from './parseDate';

describe('parseDate', () => {
  it('falls back', () => {
    expect(parseDate({ date: '' })).toEqual(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(parseDate({ date: null as any })).toEqual(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(parseDate({ date: undefined as any })).toEqual(null);

    expect(parseDate({ date: '100/100/100' })).toEqual(null);
    expect(parseDate({ date: 'boop' })).toEqual(null);
  });

  it('parses', () => {
    const assertDate = (date: string, expected: string) => {
      const parsedDate = parseDate({ date })!;

      try {
        expect(parsedDate.toLocaleString().startsWith(expected)).toEqual(true);
      } catch {
        throw new Error(
          `Expected parsed date – ${parsedDate.toLocaleString()} – to match ${expected}`,
        );
      }
    };

    assertDate('12/31/1999', '12/31/1999');
    assertDate('1/1/2000', '1/1/2000');
  });
});
