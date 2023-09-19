export const waitForDelay = (delayTime: number) => new Promise((resolve) => {
  setTimeout(resolve, delayTime)
});