import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import fibonacciPageStyles from "./fibonacci-page.module.css";
import {getFibonacciNumber} from "../../services/algorythms";
import {Circle} from "../../components/ui/circle/circle";
import StringPageStyles from "../string/string.module.css";

export const FibonacciPage: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [index, setIndex] = useState<number>(0);

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setIndex(evt.currentTarget.valueAsNumber);
  }

  const handleButtonClick = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const fibNumbers = getFibonacciNumber(index)
    setNumbers(fibNumbers);
    console.log(numbers);
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
          />
        </div>
        <ul className={fibonacciPageStyles.performanceContainer}>
          {
            numbers &&
            numbers.map((item, index) => {
              console.log(item, index)
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
