function printBuildError(err: Error) {
  const message = err && err.message;
  console.log((message || err) + "\n");
}

export { printBuildError };
