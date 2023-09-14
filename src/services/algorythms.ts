// string reverse
export const reverseString = (letters: string[]) => {
   return [...letters].reverse();
}

// fibonacci
export const getFibonacciNumber = (index: number): number[] => {
   const fibonacciNumbers = [1, 1];

   if (index === 0) {
      return fibonacciNumbers;
   }

   if (index === 1) {
      return fibonacciNumbers;
   }
   for (let i = 2; i <= index; i++) {
      fibonacciNumbers.push(fibonacciNumbers[i - 1] + fibonacciNumbers[i - 2]);
   }

   return fibonacciNumbers;
}
// array sort

// stack

// queue

// linked list