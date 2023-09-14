import React, {useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import sortingPageStyles from "./sorting-page.module.css";
import {Button} from "../../components/ui/button/button";
import {RadioInput} from "../../components/ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {Column} from "../../components/ui/column/column";

export const SortingPage: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([])

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const getRandomNumbers = (min:number, max: number): number[] => {
    const numbersArray: number[] = [];

    for (let i = 0; i < getRandomNumber(3, 17); i++) {
      numbersArray.push(getRandomNumber(min, max))
    }

    return numbersArray;
  }

  const setRandomNumbers = (): void => {
    setNumbers(getRandomNumbers(0, 100))
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingPageStyles.container}>
        <div className={sortingPageStyles.sortingType}>
          <RadioInput
            label={'Выбор'}
            value={'default'}
          />
          <RadioInput
            label={'Пузырёк'}
          />
        </div>

        <div className={sortingPageStyles.sortingOrder}>
          <Button
            text={'По возрастанию'}
            sorting={Direction.Ascending}
          />
          <Button
            text={'По убыванию'}
            sorting={Direction.Descending}
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
                  index={item}
                />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
