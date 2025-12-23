type IndexSearch = {
  id: string
  type: 'project' | 'note' | 'task'
  title: string
  keywords: string[]
  route: string
}

export type { IndexSearch };