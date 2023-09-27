import {ElementStates} from "../types/element-states";

interface ILinkedList<T> {
  getListValues: () => string[];
  pushToHead: (input: T) => void;
  pushToTail: (input: string) => void;
  pushByIndex: (input: string, index?: number) => void;
  popFromHead: () => void;
  popFromTail: () => void;
  popByIndex: (index?: number) => void;
}

type TNode = {
  value: string;
  state: ElementStates;
}

// export class Node<T> {
//   value: T;
//   next: Node<T> | null;
//   constructor(value: T, next?: Node<T> | null) {
//     this.value = value;
//     this.next = (next === undefined ? null : next);
//   }
// }

export class LinkedList<T> implements ILinkedList<T> {
  private container: string[] = [];
  private head = 0;
  private tail = 3;

  constructor(initialList: string[]) {
    this.container = initialList;
  }

  getLength = () => {
    return this.container.length;
  }
  getListValues = (): string[] => {
    return this.container;
  }

  pushToHead = (input: T) => {
    this.tail = this.getLength() - 1;
    if (typeof input === 'string' && input.length > 0) {
      this.container.unshift(input);
      this.tail = this.getLength() - 1;
    }
  };
  pushToTail = (input: string) => {
    this.tail = this.getLength() - 1;
    if (typeof input === 'string' && input.length > 0) {
      this.container.push(input);
      this.tail = this.getLength() - 1;
    }
  };
  pushByIndex = (input: string, index?: number) => {
    if (index && this.container.length >= index && typeof input === 'string' && input.length > 0) {
      this.container.splice(index, 0, input)
      this.tail = this.getLength() - 1;
    }
  };
  popFromHead = () => {
    if (this.container.length > 0) {
      this.container.shift();
      this.tail = this.getLength() - 1;
    }
  };
  popFromTail = () => {
    if (this.container.length > 0) {
      this.container.pop();
      this.tail = this.getLength() - 1;
    }
  };
  popByIndex = (index: number | undefined) => {
    if (index && this.container.length >= index) {
      this.container.splice(index, 1)
      this.tail = this.getLength() - 1;
    }
  };

  getHead = () => {
    return this.head;
  }
  getTail = () => {
    return this.tail;
  }

}