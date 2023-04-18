export function picker<T extends object>(object: T, key: keyof T) {
  if (typeof object !== 'object') {
    return console.log('Please use an object in first params')
  }

  return object[key]
}
