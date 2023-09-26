import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import listPageStyles from "../list-page/list-page.module.css";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../../components/ui/icons/arrow-icon";
import {LinkedList} from "../../services/linked-list";
import {initialList} from "../../constants/initial-data";
import {waitForDelay} from "../../services/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

const linkedList = new LinkedList(initialList);

type TSubCircle = {
  value: string;
  index: number;
  state: ElementStates;
  position: 'top' | 'bottom';
}

export const ListPage: React.FC = () => {
  const [linkedListData, setLinkedListData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number | undefined>(0);
  const [head, setHead] = useState<number | null>(linkedList.getHead());
  const [tail, setTail] = useState<number | null>(linkedList.getTail());

  const [highlightedIndex, setHighlightedIndex] = useState<number[]>([]);
  const [subCircle, setSubCircle] = useState<TSubCircle | null>(null);
  const [modifiedIndex, setModifiedIndex] = useState<number | null>(null);

  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(false);
  const [isAddButtonLoading, setIsAddButtonLoading] = useState<boolean>(false);
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(highlightedIndex);
  }, [highlightedIndex])

  useEffect(() => {
    setLinkedListData(linkedList.getListValues().map((item) => {
      return {
        value: item,
        state: ElementStates.Changing,
      }
    }))
  }, [])

  const handleInputValueChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setInputValue(evt.currentTarget.value)
  }

  const handleInputIndexChange = (evt: FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setInputIndex(evt.currentTarget.valueAsNumber);
  }

  // add button handlers
  const handleAddToHeadButton = async (input: string) => {
    setSubCircle({
      value: input,
      index: 0,
      state: ElementStates.Changing,
      position: 'top',
    });
    setHead(null)

    await waitForDelay(SHORT_DELAY_IN_MS);
    linkedList.pushToHead(input);
    setSubCircle(null);

    setHead(linkedList.getHead())
    setTail(linkedList.getTail());
    setModifiedIndex(0);

    await waitForDelay(SHORT_DELAY_IN_MS);
    setLinkedListData(linkedList.getListValues());
    setModifiedIndex(null);

    setHead(linkedList.getHead())
    setTail(linkedList.getTail());
    setInputValue('');
  }

  const handleAddToTailButton = async (input: string) => {
    setSubCircle({
      value: input,
      index: linkedList.getTail(),
      state: ElementStates.Changing,
      position: 'top',
    });
    setTail(null)

    await waitForDelay(SHORT_DELAY_IN_MS);
    linkedList.pushToTail(input);
    setSubCircle(null);

    setHead(linkedList.getHead())
    setTail(linkedList.getTail());
    setModifiedIndex(tail! + 1);

    await waitForDelay(SHORT_DELAY_IN_MS);
    setLinkedListData(linkedList.getListValues());
    setModifiedIndex(null);

    setHead(linkedList.getHead())
    setTail(linkedList.getTail());
    setInputValue('');
  }

  const handleAddByIndexButton = async (input: string, index?: number) => {
    let highlightedIndexes: number[] = [];
    if (index && input) {
      for (let i = 0; i <= index; i++) {
        await waitForDelay(SHORT_DELAY_IN_MS);
        setSubCircle({
          value: input,
          index: i,
          state: ElementStates.Changing,
          position: 'top',
        });

        highlightedIndexes.push(i-1);
        setHighlightedIndex(highlightedIndexes);
      }

      await waitForDelay(SHORT_DELAY_IN_MS);
      linkedList.pushByIndex(input, index);
      setSubCircle(null);
      setModifiedIndex(index);
      setTail(linkedList.getTail());

      await waitForDelay(SHORT_DELAY_IN_MS);
      setHighlightedIndex([]);
      setModifiedIndex(null);

      await waitForDelay(SHORT_DELAY_IN_MS);
      setLinkedListData(linkedList.getListValues());
      setInputValue('');
    }
  }

  // delete button handlers
  const handleDeleteFromHeadButton = async () => {
    setSubCircle({
      value: linkedList.getListValues()[0],
      index: 0,
      state: ElementStates.Changing,
      position: 'bottom',
    })

    await waitForDelay(SHORT_DELAY_IN_MS);
    linkedList.popFromHead();
    setLinkedListData(linkedList.getListValues());
    setSubCircle(null);

    setHead(linkedList.getHead());
    setTail(linkedList.getTail());
  }

  const handleDeleteFromTailButton = async () => {
    setSubCircle({
      value: linkedList.getListValues()[tail!],
      index: tail!,
      state: ElementStates.Changing,
      position: 'bottom',
    })

    await waitForDelay(SHORT_DELAY_IN_MS);
    linkedList.popFromTail();
    setLinkedListData(linkedList.getListValues());
    setSubCircle(null);

    setTail(linkedList.getTail());
  }

  const handleDeleteByIndexButton = async (index: number | undefined) => {
    let temp: number[] = [];

    if (index) {
      for (let i = 0; i <= index; i++) {
        await waitForDelay(SHORT_DELAY_IN_MS);
        setHighlightedIndex(temp);
        temp.push(i);
      }

      await waitForDelay(SHORT_DELAY_IN_MS);
      setSubCircle({
        value: linkedList.getListValues()[index],
        index: index,
        state: ElementStates.Changing,
        position: 'bottom',
      })

      setHighlightedIndex([])

      await waitForDelay(SHORT_DELAY_IN_MS);
      linkedList.popByIndex(index)
      setLinkedListData(linkedList.getListValues());
      setSubCircle(null);
      setTail(linkedList.getTail());
    }
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
            onClick={() => handleAddToHeadButton(inputValue)}
            disabled={inputValue.length < 1 || addButtonDisabled}
            isLoader={isAddButtonLoading}
            extraClass={listPageStyles.valueButton}
          />
          <Button
            text={"Добавить в tail"}
            onClick={() => handleAddToTailButton(inputValue)}
            disabled={inputValue.length < 1 || addButtonDisabled}
            isLoader={isAddButtonLoading}
            extraClass={listPageStyles.valueButton}
          />
          <Button
            text={"Удалить из head"}
            onClick={() => handleDeleteFromHeadButton()}
            disabled={deleteButtonDisabled}
            isLoader={isDeleteButtonLoading}
            extraClass={listPageStyles.valueButton}
          />
          <Button
            text={"Удалить из tail"}
            onClick={() => handleDeleteFromTailButton()}
            disabled={deleteButtonDisabled}
            isLoader={isDeleteButtonLoading}
            extraClass={listPageStyles.valueButton}
          />
        </div>


        <div className={listPageStyles.inputWrapper}>
          <Input
            placeholder={"Введите индекс"}
            type={"number"}
            maxLength={4}
            isLimitText={false}
            value={inputIndex}
            onChange={handleInputIndexChange}
            extraClass={listPageStyles.input}
          />
          <Button
            text={"Добавить по индексу"}
            onClick={() => handleAddByIndexButton(inputValue, inputIndex)}
            disabled={!inputIndex || inputValue.length < 1}
            isLoader={isAddButtonLoading}
            extraClass={listPageStyles.indexButton}
          />
          <Button
            text={"Удалить по индексу"}
            onClick={() => handleDeleteByIndexButton(inputIndex)}
            disabled={deleteButtonDisabled}
            isLoader={isDeleteButtonLoading}
            extraClass={listPageStyles.indexButton}
          />
        </div>



      </form>
      <ul className={listPageStyles.performanceContainer}>
        {
          linkedList && linkedListData &&
          [...linkedList.getListValues()].map((item, index) => {
            return (
              <li className={listPageStyles.circle} key={index}>
                {
                  subCircle && subCircle.index === index &&
                  <Circle
                  isSmall={true}
                  letter={subCircle.value}
                  state={subCircle.state}
                  extraClass={subCircle.position === 'top'? listPageStyles.subCircleTop : listPageStyles.subCircleBottom}
                />
                }
                <Circle
                  letter={subCircle && subCircle.position === 'bottom' && subCircle.index === index ? '' : item}
                  index={subCircle?.position === 'bottom' && subCircle?.index === index ? undefined : index}
                  state={highlightedIndex.includes(index)
                    ? ElementStates.Changing
                    : index === modifiedIndex
                      ? ElementStates.Modified
                      : ElementStates.Default }
                  head={head === index && subCircle?.index !== index ? 'head' : ''}
                  tail={tail === index && subCircle?.index !== index ? 'tail' : ''}
                />
                {
                  index < linkedList.getLength() - 1 &&
                  <ArrowIcon
                    fill={highlightedIndex.includes(index) ? '#D252E1' : '#0032FF'}
                  />
                }
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
