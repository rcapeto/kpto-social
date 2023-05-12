export function createEventName(event: string) {
  const hasSpace = event.includes(' ')

  if (!hasSpace) {
    return event.toLowerCase()
  }

  return event.toLowerCase().split(' ').join('_')
}
