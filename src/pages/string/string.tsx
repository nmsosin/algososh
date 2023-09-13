import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Button} from "../../components/ui/button/button";
import {Input} from "../../components/ui/input/input";
import StringPageStyles from './string.module.css'
import {Circle} from "../../components/ui/circle/circle";
import {reverseString} from "../../services/algorythms";

export const StringComponent: React.FC = () => {
  const [letters, setLetters] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('');

  const handleButtonClick = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(inputValue)
    const lettersReversed = reverseString(letters)
    setLetters(inputValue.split(''))
    reverseString(letters);
    console.log('letters', letters)
  }

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value.trim())
    console.log('inputValue', inputValue)
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
          />
        </div>

        <ul className={StringPageStyles.performanceContainer}>
          { letters.length > 0 &&
            letters.map((item, index) => {
              return (
                <li key={index} className={StringPageStyles.circle}>
                  <Circle
                    letter={item}
                    // index={index}

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
