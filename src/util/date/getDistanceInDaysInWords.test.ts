import { describe, expect, it } from 'bun:test';

import { getDistanceInDaysInWords } from './getDistanceInDaysInWords';

describe('getDistanceInDaysInWords', () => {
  it('returns distance as words', () => {
    expect(getDistanceInDaysInWords({ distance: -2 })).toEqual('2 days ago');
    expect(getDistanceInDaysInWords({ distance: -1 })).toEqual('yesterday');
    expect(getDistanceInDaysInWords({ distance: 0 })).toEqual('today');
    expect(getDistanceInDaysInWords({ distance: 1 })).toEqual('tomorrow');
    expect(getDistanceInDaysInWords({ distance: 1 })).toEqual('tomorrow');
    expect(getDistanceInDaysInWords({ distance: 2 })).toEqual('in 2 days');
    expect(getDistanceInDaysInWords({ distance: 3 })).toEqual('in 3 days');

    expect(getDistanceInDaysInWords({ capitalize: true, distance: 1 })).toEqual(
      'Tomorrow',
    );

    expect(getDistanceInDaysInWords({ capitalize: true, distance: 2 })).toEqual(
      'In 2 days',
    );
  });
});
