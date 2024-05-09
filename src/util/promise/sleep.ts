function sleep(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export { sleep };
