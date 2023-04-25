import { ImageObject } from '.'

export interface MeDeveloper {
  createdAt: string
  github: string
  id: string
  name: string
  techs: string
  _count: {
    posts: number
    comments: number
    likes: number
    friends: number
  }
  avatar_url: {
    origin: string
    web: string
    mobile: string
  }
  posts: {
    title: string
    comments: number
    likes: number
    thumbnail: {
      origin: string
      web: string
      mobile: string
    }
  }[]
}

export interface FindOneDeveloper {
  createdAt: string
  github: string
  id: string
  name: string
  techs: string
  _count: {
    posts: number
    comments: number
    likes: number
    friends: number
    symmetricFriends: number
  }
  avatar_url: ImageObject
  posts: FindOneDeveloperPost[]
}

export interface FindOneDeveloperPost {
  title: string
  comments: number
  likes: number
  thumbnail: ImageObject
  id: string
}
