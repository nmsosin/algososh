import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import fibonacciPageStyles from "./fibonacci-page.module.css";
import {getFibonacciNumber} from "../../services/fibonacci";
import {Circle} from "../../components/ui/circle/circle";
import StringPageStyles from "../string-page/string.module.css";
import {waitForDelay} from "../../services/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isInputInvalid = typeof index !== 'number' || !index || index && index > 19 || index <= 0 ;

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setIndex(evt.currentTarget.valueAsNumber);
  }

  const addFibNumber = async (index: number) => {
    let numbersArray: number[] = [];
    for (let i = 0; i <= index; i++) {
      await waitForDelay(SHORT_DELAY_IN_MS)
      numbersArray.push(getFibonacciNumber(i))

      setNumbers([...numbersArray])
    }

    setButtonDisabled(false);
    setIsLoading(false);
  }

  const handleButtonClick = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setButtonDisabled(true);
    setIsLoading(true);
    if (index) {
      addFibNumber(index);
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleButtonClick} className={fibonacciPageStyles.form}>
        <div className={fibonacciPageStyles.inputWrapper}>
          <Input
            placeholder={'Введите текст'}
            type={'number'}
            maxLength={2}
            max={19}
            isLimitText={true}
            onChange={handleInputChange}
          />
          <Button
            text={'Рассчитать'}
            type={'submit'}
            disabled={isInputInvalid || buttonDisabled}
            isLoader={isLoading}
          />
        </div>
        <ul className={fibonacciPageStyles.performanceContainer}>
          {
            numbers &&
            numbers.map((item, index) => {
              return (
                <li key={index} className={StringPageStyles.circle}>
                  <Circle
                    letter={item.toString()}
                    index={index}

                  />
                </li>
              )
            })
          }
        </ul>
      </form>
    </SolutionLayout>
  );
};
