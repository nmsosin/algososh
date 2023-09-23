// calculating random values
import {MAX_ARR_LENGTH, MIN_ARR_LENGTH} from "../constants/value-limits";
import {ElementStates} from "../types/element-states";

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

export const swapItems = ( numbers: TSortingColumns[] ,leftItem: number, rightItem: number): TSortingColumns[] => {
  const tempItem = numbers[leftItem];
  numbers[leftItem] = numbers[rightItem];
  numbers[rightItem] = tempItem;

  return [...numbers]
}