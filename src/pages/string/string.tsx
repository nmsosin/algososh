import React, {FormEvent, useEffect, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Button} from "../../components/ui/button/button";
import {Input} from "../../components/ui/input/input";
import StringPageStyles from './string.module.css'
import {Circle} from "../../components/ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {DELAY_L} from "../../services/constants";

type TLetter = {
  value?: string;
  state?: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [circles, setCircles] = useState<TLetter[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value.trim())
  }

  const waitForDelay = (delayTime: number) => new Promise((resolve) => {
    setTimeout(resolve, delayTime)
  });

  const replaceCircles = async (inputValue: string) => {
    const letters = inputValue.split('');

    let circlesArray: any[] = [];
    for (let i = 0; i < letters.length; i++) {
      circlesArray.push({
        value: letters[i],
        state: ElementStates.Default
      })
    }

    setCircles(circlesArray);

    let start = 0;
    let end = circlesArray.length - 1;

    while (start <= end) {
      let tempStr = '';

      await waitForDelay(DELAY_L)
      circlesArray[start].state = ElementStates.Changing;
      circlesArray[end].state = ElementStates.Changing;
      setCircles([...circlesArray]);

      await waitForDelay(DELAY_L)
      tempStr = circlesArray[start].value;
      circlesArray[start].value = circlesArray[end].value;
      circlesArray[end].value = tempStr;

      circlesArray[start].state = ElementStates.Modified;
      circlesArray[end].state = ElementStates.Modified;

      start++;
      end--;
      setCircles([...circlesArray]);
    }

    setButtonDisabled(false);
    setIsLoading(false);
  }

  const handleButtonClick = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setButtonDisabled(true);
    setIsLoading(true);
    replaceCircles(inputValue);

  }

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={handleButtonClick} className={StringPageStyles.form}>
        <div className={StringPageStyles.inputWrapper}>
          <Input
            placeholder={'Введите текст'}
            maxLength={11}
            isLimitText={true}
            onChange={handleInputChange}
          />
          <Button
            text={'Развернуть'}
            type={'submit'}
            disabled={buttonDisabled}
            isLoader={isLoading}
          />
        </div>

        <ul className={StringPageStyles.performanceContainer}>
          { circles.length > 0 &&
            circles.map((item, index) => {
              return (
                <li key={index} className={StringPageStyles.circle}>
                  <Circle
                    letter={item.value}
                    state={item.state}
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
