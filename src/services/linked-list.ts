interface ILinkedList<T> {
  getListValues: () => T[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private container: T[] = [];

  constructor() {
    this.container = [];
  }



  getListValues = (): T[] => {
    return this.container;
  }
}