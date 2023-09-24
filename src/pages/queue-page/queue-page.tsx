import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../../components/ui/solution-layout/solution-layout";
import queuePageStyles from "../queue-page/queue-page.module.css";
import {Input} from "../../components/ui/input/input";
import {Button} from "../../components/ui/button/button";
import {Circle} from "../../components/ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue} from "../../services/queue";
import {MAX_QUEUE_LENGTH} from "../../constants/value-limits";
import {waitForDelay} from "../../services/utils";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";

type TQueueValue = {
  value: string;
  state?: ElementStates;
  head?: number;
  tail?: number

}


export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string >('');
  const [queue, setQueue] = useState(new Queue(Array<string>(MAX_QUEUE_LENGTH)));
  const [head, setHead] = useState(queue.getHead());
  const [tail, setTail] = useState(queue.getTail());
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(false);
  const [isAddButtonLoading, setIsAddButtonLoading] = useState<boolean>(false);
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState<boolean>(false);

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value)
  }

  useEffect(() => {
    setAddButtonDisabled(inputValue.trim().length === 0)
  }, [])

  useEffect(() => {
    if (tail >= MAX_QUEUE_LENGTH) {
      setAddButtonDisabled(true)
    }
  }, [tail])

  useEffect(() => {
    setDeleteButtonDisabled(head === tail)
  }, [tail, head])

  const handleAddButton = async (inputValue: string) => {
    setAddButtonDisabled(true)
    setIsAddButtonLoading(true)
    if (inputValue) {
      queue.enqueue(inputValue);
    }

    setHead(queue.getHead());
    setTail(queue.getTail());

    setHighlightedIndex(tail);
    await waitForDelay(DELAY_IN_MS);
    setHighlightedIndex(null);

    setAddButtonDisabled(false)
    setIsAddButtonLoading(false)
  }

  const handleDeleteButton = async () => {
    setDeleteButtonDisabled(true);
    setIsDeleteButtonLoading(true);

    setHighlightedIndex(head - 1);
    await waitForDelay(DELAY_IN_MS);
    setHighlightedIndex(null);
    queue.dequeue('');

    setHead(queue.getHead());
    setTail(queue.getTail());

    setDeleteButtonDisabled(false);
    setIsDeleteButtonLoading(false);

  }

  const handleClearButton = () => {
    queue.clear();

    setHead(queue.getHead());
    setTail(queue.getTail());
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={queuePageStyles.form}>
        <div className={queuePageStyles.inputWrapper}>
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
            disabled={addButtonDisabled}
            isLoader={isAddButtonLoading}
          />
          <Button
            text={"Удалить"}
            onClick={() => handleDeleteButton()}
            disabled={deleteButtonDisabled}
            isLoader={isDeleteButtonLoading}
          />
        </div>
        <Button
          text={"Очистить"}
          onClick={() => handleClearButton()}
        />
      </form>
      <ul className={queuePageStyles.performanceContainer}>
        {
          queue &&
          [...queue.getQueueValues()].map((item,index) => {
            return (
              <li className={queuePageStyles.circle} key={index}>
                <Circle
                  letter={item}
                  state={index === highlightedIndex ? ElementStates.Changing : ElementStates.Default}
                  index={index}
                  head={index === head - 1 ? 'head' : ''}
                  tail={item !== '' && index === tail - 1 ? 'tail' : ''}
                />
              </li>
            )
          })
        }
      </ul>

    </SolutionLayout>
  );
};
