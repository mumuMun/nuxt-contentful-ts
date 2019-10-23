interface Dictionary<T> {
  [key: string]: T
}

export interface Post {
  title: string
  description: string
  body: string
}

export interface Param {
  slug: string
  date: string
}

export interface PostsDate {
  date: string
  count: string
}
