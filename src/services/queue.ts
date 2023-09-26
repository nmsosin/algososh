import {MAX_QUEUE_LENGTH} from "../constants/value-limits";

interface IQueue<T>{
  getQueueValues: () => T[];
  enqueue: (item: T) => void;
  dequeue: (item: T) => void;
  clear: () => void;
  // isEmpty: () => boolean;
  getHead: () => number;
  getTail: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = Array<T>(7)
  private head = 0;
  private tail = 0;
  constructor (initialArray: T[]) {
    this.container = initialArray;
  }

  getQueueValues = () => {
    return this.container;
  }

  enqueue = (item: T) => {
    if (this.tail >= 7) {
      // console.log('TAIL MAX', this.tail)
      throw new Error("Достигнута последняя позиция в очереди");
    }

    if (this.head === 0) {
      this.head++;
    }
    this.tail++;
    this.container[this.tail - 1] = item;

  }

  dequeue = (item: T) => {
    if (this.tail === 0 && this.head === 0) {
      console.log('QUEUE EMPTY', this.tail, this.head)
      throw new Error("Очередь пуста");
    }

    if (this.head > 0 && this.head <= MAX_QUEUE_LENGTH && this.head <= this.tail) {
      if (this.head === this.tail) {
        this.container[this.head - 1] = item;
        this.tail++;
      }
      this.container[this.head - 1] = item;
      this.head++
      console.log("STEP UP")
    }

  }

  clear = () => {
    this.container = Array<T>(7);
    this.head = 0;
    this.tail = 0;
  }

  // isEmpty = () => {
  //   return this.container.length === 0;
  // }

  getHead = () => {
    return this.head;
  }

  getTail = () => {
    return this.tail;
  }

}