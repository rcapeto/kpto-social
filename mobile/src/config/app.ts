export const appConfig = {
  teamName: 'KPTO-Social',
  emptyImage: 'https://css-tricks.com/examples/DragAvatar/images/256.jpg',
  emptyThumbnail:
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1720&q=80',
  baseUrl: {
    android: (port: string | number) => `http://192.168.15.46:${port}`,
    iOS: (port: string | number) => `http://localhost:${port}`,
  },
  serverPort: 3333,
  locale: 'pt-br',
}
