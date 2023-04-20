export async function wait(seconds: number) {
  const oneMinuteInMs = 1000
  const timeout = seconds * oneMinuteInMs

  await new Promise((resolve) => setTimeout(resolve, timeout))
}
