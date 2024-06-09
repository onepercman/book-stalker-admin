interface Book {
  _id: string
  _v: string
  name: string
  uri: string
  thumbnail: string
  tracker: Tracker | null
  isLiked?: boolean
  categoryId: string
  category: Category
}
