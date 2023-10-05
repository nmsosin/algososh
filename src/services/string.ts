import React from "react";
import {waitForDelay} from "./utils";
import {DELAY_IN_MS} from "../constants/delays";
import {ElementStates} from "../types/element-states";
import {TLetter} from "../pages/string-page/string";

export const iterativeReverse = async (inputValue: string, setter?: React.Dispatch<React.SetStateAction<TLetter[]>> ) => {
  const letters = inputValue.split('');

  let circlesArray: TLetter[] = [];
  for (let i = 0; i < letters.length; i++) {
    circlesArray.push({
      value: letters[i],
      state: ElementStates.Default
    })
  }

  setter!(circlesArray);

  let start = 0;
  let end = circlesArray.length - 1;

  let tempStr = '';
  while (start <= end) {
    circlesArray[start].state = ElementStates.Changing;
    circlesArray[end].state = ElementStates.Changing;
    setter!([...circlesArray]);

    await waitForDelay(DELAY_IN_MS);
    tempStr = circlesArray[start].value;
    circlesArray[start].value = circlesArray[end].value;
    circlesArray[end].value = tempStr;

    circlesArray[start].state = ElementStates.Modified;
    circlesArray[end].state = ElementStates.Modified;

    start++;
    end--;
    setter!([...circlesArray]);
  }

  let resultArr = [];
  for (let i = 0; i < circlesArray.length; i++) {
    resultArr.push(circlesArray[i].value);
  }

  return resultArr;
}

export const testIterativeReverse = (inputValue: string) => {
  const letters = inputValue.split('');

  let circlesArray: TLetter[] = [];
  for (let i = 0; i < letters.length; i++) {
    circlesArray.push({
      value: letters[i],
      state: ElementStates.Default
    })
  }

  let start = 0;
  let end = circlesArray.length - 1;

  let tempStr = '';
  while (start <= end) {
    tempStr = circlesArray[start].value;
    circlesArray[start].value = circlesArray[end].value;
    circlesArray[end].value = tempStr;

    start++;
    end--;
  }

  let resultArr = [];
  for (let i = 0; i < circlesArray.length; i++) {
    resultArr.push(circlesArray[i].value);
  }

  return resultArr;
}