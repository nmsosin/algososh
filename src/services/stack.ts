import {ElementStates} from "../types/element-states";

interface IStack<T> {
  getStackValues: () => T[];
  push: (item: T) => void;
  pop: () => void;
  getSize: () => number;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  constructor() {
    this.container = [];
  }

  getStackValues = (): T[] => {
    return this.container;
  }
  push = (item: T) => {
    this.container.push(item)
  };

  pop = () => {
    this.container.pop();
  };

  getSize = () => {
    return this.container.length;
  };

  clear = () => {
    this.container = [];
  };
}