import {testIterativeReverse} from "../../services/string";

describe('String component works correctly', function() {
  it('with even string length', function() {
    expect(testIterativeReverse('even')).toEqual(['n', 'e', 'v', 'e']);
  });
  it('with even string length', function() {
    expect(testIterativeReverse('uneven')).toEqual(['n', 'e', 'v', 'e', 'n', 'u']);
  });
  it('with a single character string', function() {
     expect(testIterativeReverse('1')).toEqual(['1']);
  });
  it('with empty string', function() {
     expect(testIterativeReverse('')).toEqual([]);
  });
})