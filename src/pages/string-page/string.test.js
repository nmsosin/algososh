import {testIterativeReverse} from "../../services/string";

describe('String component works correctly', () => {
  it('with even string-page length',  () => {
    expect(testIterativeReverse('even')).toEqual(['n', 'e', 'v', 'e']);
  });
  it('with even string-page length',  () => {
    expect(testIterativeReverse('uneven')).toEqual(['n', 'e', 'v', 'e', 'n', 'u']);
  });
  it('with a single character string-page',  () => {
     expect(testIterativeReverse('1')).toEqual(['1']);
  });
  it('with empty string-page',  () => {
     expect(testIterativeReverse('')).toEqual([]);
  });
})