export const getFibonacciNumber = (index: number): number => {
   const fibonacciNumbers = [1, 1];

   if (index === 0) {
      return fibonacciNumbers[0];
   }

   if (index === 1) {
      return fibonacciNumbers[1];
   }
   for (let i = 2; i <= index; i++) {
      fibonacciNumbers.push(fibonacciNumbers[i - 1] + fibonacciNumbers[i - 2]);
   }

   return fibonacciNumbers[index];
}
