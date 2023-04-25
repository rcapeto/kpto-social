export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: undefined
      register: undefined
      home: undefined
      search: undefined
      chat: undefined
      profile: undefined
      createPost: undefined
      postDetail: {
        postId: string
      }
      developerDetail: {
        developerId: string
      }
    }
  }
}
