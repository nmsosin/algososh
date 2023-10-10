import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Button} from "../../components/ui/button/button";
import {Input} from "../../components/ui/input/input";
import stackPageStyles from "./stack-page.module.css";
import {Stack} from "../../services/stack";
import {Circle} from "../../components/ui/circle/circle";
import {waitForDelay} from "../../services/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

const stack = new Stack();

type TStackValue = {
  value: string;
  state: ElementStates;
  head?: boolean;
}
export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string >('');
  const [stackValues, setStackValues] = useState<TStackValue[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value)
  }

  const handleAddButton = async (item: string) => {
    if (item && item !== '') {
      setButtonDisabled(true);
      setIsLoading(true);
      stack.push(item);
      const stackCircles = stack.getStackValues().map((item) => {
        return {
          value: item,
          state: ElementStates.Default,
          head: false
        }
      })
      stackCircles[stackCircles.length - 1] = {
        ...stackCircles[stackCircles.length - 1],
        state: ElementStates.Changing,
        head: true
      }
      setStackValues(stackCircles as TStackValue[])

      await waitForDelay(SHORT_DELAY_IN_MS);
      const defaultCircles = stackCircles.map((item) => {
        return {
          ...item,
            state: ElementStates.Default
        }
      })
      setStackValues(defaultCircles as TStackValue[])
    }
    setInputValue('');
    setButtonDisabled(false);
    setIsLoading(false);
  }

  const handleDeleteButton = async () => {
    if (stack) {
      setButtonDisabled(true);
      setIsLoading(true);
    }

    const stackCircles = stack.getStackValues().map((item) => {
      return {
        value: item,
        state: ElementStates.Default,
        head: false
      }
    })
    stackCircles[stackCircles.length - 1] = {
      ...stackCircles[stackCircles.length - 1],
      state: ElementStates.Changing,
      head: true
    }
    setStackValues(stackCircles as TStackValue[])

    await waitForDelay(SHORT_DELAY_IN_MS);
    stack.pop();

    const defaultCircles = stack.getStackValues().map((item) => {
      return {
        value: item,
        state: ElementStates.Default,
        head: false
      }
    })

    defaultCircles[defaultCircles.length - 1] = {
      ...defaultCircles[defaultCircles.length - 1],
      head: true
    }
    setStackValues(defaultCircles as TStackValue[])

    setButtonDisabled(false);
    setIsLoading(false);
  }

    const handleClearButton = () => {
    stack.clear();
    setStackValues([])
  }

  return (
    <SolutionLayout title="Стек">
      <form className={stackPageStyles.form}>
        <div className={stackPageStyles.inputWrapper}>
          <Input
            type={"text"}
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            text={"Добавить"}
            onClick={() => handleAddButton(inputValue)}
            disabled={inputValue.length === 0 || buttonDisabled}
            isLoader={isLoading}
          />
          <Button
            text={"Удалить"}
            onClick={() => handleDeleteButton()}
            disabled={stackValues.length === 0 || buttonDisabled}
            isLoader={isLoading}
          />
        </div>
        <Button
          text={"Очистить"}
          onClick={() => handleClearButton()}
          disabled={stackValues.length === 0 || buttonDisabled}
          isLoader={isLoading}
        />
      </form>
      <ul className={stackPageStyles.performanceContainer}>
        {
          stackValues &&
          stackValues.map((item,index) => {
            return (
              <li className={stackPageStyles.circle} key={index}>
                <Circle
                  letter={item.value}
                  state={item.state}
                  index={index}
                  head={item.head ? 'top' : ''}
                />
              </li>
            )
          })
        }
      </ul>

    </SolutionLayout>
  );
};
