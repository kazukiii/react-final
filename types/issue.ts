export interface Issue {
  id: string
  title: string
  state: string
  url: string
  createdAt: string
  updatedAt: string
}

export interface IssueForm {
  id: string
  title: string
  state: string
  url?: string
  createdAt?: string
  updatedAt?: string
}
