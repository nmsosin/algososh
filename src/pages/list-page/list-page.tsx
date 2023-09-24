import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import listPageStyles from "../list-page/list-page.module.css";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../../components/ui/icons/arrow-icon";

const initialList = [
  {
    value: '0',
    index: 0,
    state: ElementStates.Default,
    head: true,
    tail: false
  },
  {
    value: '34',
    index: 1,
    state: ElementStates.Default,
    head: false,
    tail: false
  },
  {
    value: '8',
    index: 2,
    state: ElementStates.Default,
    head: false,
    tail: false
  },
  {
    value: '1',
    index: 3,
    state: ElementStates.Default,
    head: false,
    tail: true
  },
]

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputValueChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setInputValue(evt.currentTarget.value)
  }

  const handleInputIndexChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setInputIndex(evt.currentTarget.valueAsNumber)
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={listPageStyles.form}>
        <div className={listPageStyles.inputWrapper}>
          <Input
            placeholder={"Введите значение"}
            type={"text"}
            maxLength={4}
            isLimitText={true}
            value={inputValue}
            onChange={handleInputValueChange}
            extraClass={listPageStyles.input}
          />
          <Button
            text={"Добавить в head"}
            onClick={() => {}}
            disabled={buttonDisabled}
            isLoader={isLoading}
            extraClass={listPageStyles.valueButton}
          />
          <Button
            text={"Добавить в tail"}
            onClick={() => {}}
            disabled={buttonDisabled}
            isLoader={isLoading}
            extraClass={listPageStyles.valueButton}
          />
          <Button
            text={"Удалить из head"}
            onClick={() => {}}
            disabled={buttonDisabled}
            isLoader={isLoading}
            extraClass={listPageStyles.valueButton}
          />
          <Button
            text={"Удалить из tail"}
            onClick={() => {}}
            disabled={buttonDisabled}
            isLoader={isLoading}
            extraClass={listPageStyles.valueButton}
          />
        </div>


        <div className={listPageStyles.inputWrapper}>
          <Input
            placeholder={"Введите индекс"}
            type={"num"}
            maxLength={4}
            isLimitText={false}
            value={inputIndex}
            onChange={handleInputIndexChange}
            extraClass={listPageStyles.input}
          />
          <Button
            text={"Добавить по индексу"}
            onClick={() => {}}
            disabled={buttonDisabled}
            isLoader={isLoading}
            extraClass={listPageStyles.indexButton}
          />
          <Button
            text={"Удалить по индексу"}
            onClick={() => {}}
            disabled={buttonDisabled}
            isLoader={isLoading}
            extraClass={listPageStyles.indexButton}
          />
        </div>



      </form>
      <ul className={listPageStyles.performanceContainer}>
        {
          initialList &&
          initialList.map((item,index) => {
            return (
              <li className={listPageStyles.circle} key={index}>
                <Circle
                  letter={item.value}
                  state={item.state}
                  head={item.head ? 'head' : ''}
                  tail={item.tail ? 'tail' : ''}
                />
                {
                  index < initialList.length - 1 &&
                  <ArrowIcon />
                }
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
