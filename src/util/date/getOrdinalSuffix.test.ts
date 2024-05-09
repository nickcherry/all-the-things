import { describe, expect, it } from 'bun:test';

import { getOrdinalSuffix } from '~/util/date/getOrdinalSuffix';

describe('getOrdinalSuffix', () => {
  it('should return the suffix', () => {
    expect(getOrdinalSuffix(1)).toEqual('st');
    expect(getOrdinalSuffix(2)).toEqual('nd');
    expect(getOrdinalSuffix(3)).toEqual('rd');
    expect(getOrdinalSuffix(4)).toEqual('th');
    expect(getOrdinalSuffix(5)).toEqual('th');
    expect(getOrdinalSuffix(6)).toEqual('th');
    expect(getOrdinalSuffix(7)).toEqual('th');
    expect(getOrdinalSuffix(8)).toEqual('th');
    expect(getOrdinalSuffix(9)).toEqual('th');

    expect(getOrdinalSuffix(10)).toEqual('th');
    expect(getOrdinalSuffix(11)).toEqual('th');
    expect(getOrdinalSuffix(12)).toEqual('th');
    expect(getOrdinalSuffix(13)).toEqual('th');
    expect(getOrdinalSuffix(14)).toEqual('th');
    expect(getOrdinalSuffix(15)).toEqual('th');
    expect(getOrdinalSuffix(16)).toEqual('th');
    expect(getOrdinalSuffix(17)).toEqual('th');
    expect(getOrdinalSuffix(18)).toEqual('th');
    expect(getOrdinalSuffix(19)).toEqual('th');

    expect(getOrdinalSuffix(20)).toEqual('th');
    expect(getOrdinalSuffix(21)).toEqual('st');
    expect(getOrdinalSuffix(22)).toEqual('nd');
    expect(getOrdinalSuffix(23)).toEqual('rd');
    expect(getOrdinalSuffix(24)).toEqual('th');
    expect(getOrdinalSuffix(25)).toEqual('th');
    expect(getOrdinalSuffix(26)).toEqual('th');
    expect(getOrdinalSuffix(27)).toEqual('th');
    expect(getOrdinalSuffix(28)).toEqual('th');
    expect(getOrdinalSuffix(29)).toEqual('th');

    expect(getOrdinalSuffix(30)).toEqual('th');
    expect(getOrdinalSuffix(31)).toEqual('st');
  });
});
