import { ImageObject } from '~/interfaces/entity'

export interface FindManyPost {
  createdAt: string
  description: string
  editAt: string | null
  developerId: string
  id: string
  comments: number
  title: string
  likes: number
  author: {
    id: string
    name: string
    techs: string
    createdAt: string
    github: string
    avatar_url: ImageObject
  }
  thumbnail: ImageObject
}
