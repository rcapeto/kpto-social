import { ImageObject } from '~/interfaces/entity'

export interface FindOnePostComment {
  author: {
    name: string
    github: string
    id: string
    avatar_url: ImageObject
  }
  id: string
  createdAt: string
  developerId: string
  text: string
  techs?: string
}
