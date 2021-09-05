import { translateNonNumericCharacters, isValidChecksum } from './../src/index';
import { isValidIsin, isIsinFormat, isANumber } from "../src";

describe("isIsinFormat", () => {
  it("should return whether the string is in isin format", () => {
    const validIsin = "US0378331005";
    expect(isIsinFormat(validIsin)).toEqual(true);
  });
  it('should detect if the isin is correct', () => {
    const validIsin1 = "DE000BAY0017";
    const validIsing2 = "AU0000XVGZA3";
    const invalidIsin = "DE000BAY0018";
    expect(isValidIsin(validIsin1)).toEqual(true);
    expect(isValidIsin(validIsing2)).toEqual(true);
    expect(isValidIsin(invalidIsin)).toEqual(false);
  })
});

describe ('isinFormater', () => {
  it('should translate non numeric characters to numeric characters', () => {
    const nonNumericCharacter = 'DE000BAY001';
    const expectedResult = "1314000111034001";
    expect(translateNonNumericCharacters(nonNumericCharacter)).toEqual(expectedResult);
  })
});

describe ('utilities', () => {
  it('isANumbers should detect numbers', () => {
    expect(isANumber('1')).toEqual(true);
    expect(isANumber('A')).toEqual(false);
  })
  it('should detect a correct checksum', () => {
    expect(isValidChecksum('13140001110340017')).toEqual(true);
    expect(isValidChecksum('13140001110340018')).toEqual(false);
  })
})
