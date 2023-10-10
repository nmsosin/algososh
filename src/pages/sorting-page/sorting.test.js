import {testBubbleSorting, testSelectionSorting} from "../../services/sorting";

describe('Array sorting component works correctly', () => {
  // selection sort && ascending order
  it('with ascending order selection sort of an empty array', () => {
    expect(testSelectionSorting([], 'ascending')).toEqual([]);
  });
  it('with ascending order selection sort of a single item array', () => {
    expect(testSelectionSorting([1], 'ascending')).toEqual([1]);
  });
  it('with ascending order selection sort of an array of any length', () => {
    expect(testSelectionSorting([4, 1, 3, 5, 2], 'ascending')).toEqual([1, 2, 3, 4, 5]);
  });
  // selection sort && descending order
  it('with descending order selection sort of an empty array', () => {
    expect(testSelectionSorting([], 'descending')).toEqual([]);
  });
  it('with descending order selection sort of a single item array', () => {
    expect(testSelectionSorting([1], 'descending')).toEqual([1]);
  });
  it('with descending order selection sort of an array of any length', () => {
    expect(testSelectionSorting([4, 1, 3, 5, 2], 'descending')).toEqual([5, 4, 3, 2, 1]);
  });

  //bubble sort && ascending order
  it('with ascending order bubble sort of an empty array', () => {
    expect(testBubbleSorting([], 'ascending')).toEqual([]);
  });
  it('with ascending order bubble sort of a single item array', () => {
    expect(testBubbleSorting([1], 'ascending')).toEqual([1]);
  });
  it('with ascending order bubble sort of an array of any length', () => {
    expect(testBubbleSorting([4, 1, 3, 5, 2], 'ascending')).toEqual([1, 2, 3, 4, 5]);
  });

  //bubble sort && descending order
  it('with descending order bubble sort of an empty array', () => {
    expect(testBubbleSorting([], 'descending')).toEqual([]);
  });
  it('with descending order bubble sort of a single item array', () => {
    expect(testBubbleSorting([1], 'descending')).toEqual([1]);
  });
  it('with descending order bubble sort of an array of any length', () => {
    expect(testBubbleSorting([4, 1, 3, 5, 2], 'descending')).toEqual([5, 4, 3, 2, 1]);
  });
})