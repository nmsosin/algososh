import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import sortingPageStyles from "./sorting-page.module.css";
import {Button} from "../../components/ui/button/button";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {Column} from "../../components/ui/column/column";
import {MAX_ARR_VALUE, MIN_ARR_VALUE} from "../../constants/value-limits";
import {getRandomNumbers, swapItems, TSortingColumns} from "../../services/sorting";
import {ElementStates} from "../../types/element-states";
import {waitForDelay} from "../../services/utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [numbers, setNumbers] = useState<TSortingColumns[]>([])
  const [sortingType, setSortingType] = useState<string>('selection');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setRandomNumbers = (): void => {
    setNumbers(getRandomNumbers(MIN_ARR_VALUE, MAX_ARR_VALUE))
  }

  const handleChangeSortingType = (evt: ChangeEvent<HTMLInputElement>) => {
    setSortingType(evt.target.value);
  }

  // selection sort
  const selectionSorting = async (array: TSortingColumns[], order: string) => {
    let tempArr = [...array];
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i].state = ElementStates.Default;
    }

    for (let i = 0; i < tempArr.length; i++) {
      let min = i;
      tempArr[min].state = ElementStates.Changing;

      for (let j = i+1; j < tempArr.length; j++) {
        tempArr[j].state = ElementStates.Changing;
        setNumbers([...tempArr]);

        await waitForDelay(DELAY_IN_MS)
        if (order === 'ascending' ? tempArr[j].value < tempArr[min].value : tempArr[j].value > tempArr[min].value) {
          min = j;
          tempArr[j].state = ElementStates.Changing;
          tempArr[min].state = ElementStates.Default;
        }
        if (j !== min) {
          tempArr[j].state = ElementStates.Default;
        }
      }
      if (min === i) {
        tempArr[i].state = ElementStates.Modified;
        setNumbers([...tempArr]);
      } else {
        tempArr = swapItems(tempArr, i, min);
        tempArr[min].state = ElementStates.Default;
        tempArr[i].state = ElementStates.Modified;
      }
      setNumbers([...tempArr]);
    }
    setButtonDisabled(false);
    setIsLoading(false);
  }

  // TODO: bubble sort
  // const bubbleSorting = async (array: number[], order: string) => {
  //   let tempArr = [...array];
  //
  // }

  const handleAscendingOrderClick = async () => {
    setButtonDisabled(true);
    setIsLoading(true);
    switch (sortingType) {
      case 'selection':
        await selectionSorting(numbers, 'ascending');
        break;
      // case 'bubble':
      //   await bubbleSorting(numbers, 'ascending');
      //   break;
    }

    return new Error();
  }

  const handleDescendingOrderClick = async () => {
    switch (sortingType) {
      case 'selection':
        await selectionSorting(numbers, 'descending');
        break;
      // case 'bubble':
      //   await bubbleSorting(numbers, 'descending');
      //   break;
    }

    return new Error();
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingPageStyles.container}>
        <div className={sortingPageStyles.sortingType}>
          <RadioInput
            label={'Выбор'}
            value={'selection'}
            onChange={handleChangeSortingType}
            checked={sortingType === 'selection'}
          />
          <RadioInput
            label={'Пузырёк'}
            value={'bubble'}
            onChange={handleChangeSortingType}
            checked={sortingType === 'bubble'}
          />
        </div>

        <div className={sortingPageStyles.sortingOrder}>
          <Button
            text={'По возрастанию'}
            sorting={Direction.Ascending}
            onClick={handleAscendingOrderClick}
          />
          <Button
            text={'По убыванию'}
            sorting={Direction.Descending}
            onClick={handleDescendingOrderClick}
          />
        </div>

        <Button
          text={'Новый массив'}
          onClick={setRandomNumbers}
        />
      </div>

      <ul className={sortingPageStyles.performanceContainer}>
        {
          numbers &&
          numbers.map((item, index) => {
            return (
              <li key={index}>
                <Column
                  index={item.value}
                  state={item.state}
                />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
