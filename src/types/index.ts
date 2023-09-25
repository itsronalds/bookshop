export type Book = {
  title: string
  chapters: number
  pages: number
  authors: number[]
}

export type BookDetails = Pick<Book, 'chapters' | 'pages'>

export type Author = {
  authorId: number
  name: string
}
