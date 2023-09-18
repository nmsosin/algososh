import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import {Button} from "../../components/ui/button/button";
import {Input} from "../../components/ui/input/input";
import stackPageStyles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [stackValues, setStackValues] = useState<number[]>([]);

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.valueAsNumber)
    console.log('inputValue', inputValue)
  }

  const handleAddButton = () => {

  }

  const handleDeleteButton = () => {
    setStackValues([])
  }

    const handleClearButton = () => {

  }

  return (
    <SolutionLayout title="Стек">
      <form className={stackPageStyles.form}>
        <div className={stackPageStyles.inputWrapper}>
          <Input
            type={"text"}
            maxLength={4}
            isLimitText={true}
            onChange={handleInputChange}
          />
          <Button
            text={"Добавить"}
            onClick={handleAddButton}
          />
          <Button
            text={"Удалить"}
            onClick={handleDeleteButton}
          />
        </div>
        <Button
          text={"Очистить"}
          onClick={handleClearButton}
        />
      </form>
      <ul>

      </ul>

    </SolutionLayout>
  );
};
