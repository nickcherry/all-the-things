import { describe, expect, it } from 'bun:test';

import { parseTime } from './parseTime';

describe('parseTime', () => {
  it('falls back', () => {
    expect(parseTime({ time: '' })).toEqual(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(parseTime({ time: null as any })).toEqual(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(parseTime({ time: undefined as any })).toEqual(null);

    // expect(parseTime({ time: '100/100/100' })).toEqual(null);
    expect(parseTime({ time: 'boop' })).toEqual(null);
  });

  it('parses', () => {
    const assertTime = (time: string, expected: string) => {
      const parsedTime = parseTime({ time })!;

      try {
        expect(parsedTime.toLocaleTimeString().startsWith(expected)).toEqual(
          true,
        );
      } catch {
        throw new Error(
          `Expected parsed time – ${parsedTime.toLocaleTimeString()} – to match ${expected}`,
        );
      }
    };
    assertTime('1:23 AM', '1:23:00 AM');
    assertTime('4:56 PM', '4:56:00 PM');
  });
});
