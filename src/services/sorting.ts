// calculating random values
import {MAX_ARR_LENGTH, MIN_ARR_LENGTH} from "../constants/value-limits";
import {ElementStates} from "../types/element-states";
import {waitForDelay} from "./utils";
import {DELAY_IN_MS} from "../constants/delays";

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
}

export type TSortingColumns = {
  value: number;
  state?: ElementStates;
}

export const getRandomNumbers = (min:number, max: number): TSortingColumns[] => {
  const numbersArray: number[] = [];

  for (let i = 0; i < getRandomNumber(MIN_ARR_LENGTH, MAX_ARR_LENGTH); i++) {
    numbersArray.push(getRandomNumber(min, max))
  }

  return [...numbersArray].map((number) => {
    return {
      value: number,
      state: ElementStates.Default
    }
  });


}

// swap items
export const swapItems = ( numbers: TSortingColumns[] | number[] ,leftItem: number, rightItem: number): (number | TSortingColumns)[] => {
  const tempItem = numbers[leftItem];
  numbers[leftItem] = numbers[rightItem];
  numbers[rightItem] = tempItem;

  return [...numbers]
}

// sorting
export const testSelectionSorting = (array: number[], order: string) => {
  let tempArr = [...array];

  if(tempArr.length === 0) {
    return [];
  }

  for (let i = 0; i < tempArr.length; i++) {
    let min = i;

    for (let j = i+1; j < tempArr.length; j++) {
      // await waitForDelay(DELAY_IN_MS)
      if (order === 'ascending' ? tempArr[j] < tempArr[min] : tempArr[j] > tempArr[min]) {
        min = j;
      }
    }

    if (min !== i) {
      tempArr = swapItems(tempArr, i, min) as number[];
    }
  }
  return [...tempArr];
}

export const testBubbleSorting = (array: number[], order: string) => {
  let tempArr = [...array];

  if(tempArr.length === 0) {
    return [];
  }

  for (let i = tempArr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      // await waitForDelay(DELAY_IN_MS);
      if (order === 'ascending' ? tempArr[j] > tempArr[j + 1] : tempArr[j] < tempArr[j + 1]) {
        tempArr = swapItems(tempArr, j, j + 1) as number[];
      }
    }
  }
      return [...tempArr];
}