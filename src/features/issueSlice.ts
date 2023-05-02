import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { Issue, IssueForm } from '../../types/issue'
import { issues } from '../data/issues'
import { RootState } from '../store'

interface IssueState {
  issues: Issue[]
  filter: string
}

const initialState: IssueState = {
  issues: issues,
  filter: '',
}

export const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<IssueForm>) => {
      const newIssue: Issue = {
        id: action.payload.id || uuid(),
        title: action.payload.title,
        state: action.payload.state,
        url: action.payload.url || '',
        createdAt: action.payload.createdAt || new Date().toISOString(),
        updatedAt: action.payload.updatedAt || new Date().toISOString(),
      }
      state.issues.push(newIssue)
    },
    deleteIssue: (state, action: PayloadAction<Issue>) => {
      state.issues = state.issues.filter((issue) => issue.id !== action.payload.id)
    },
    editIssue: (state, action: PayloadAction<IssueForm>) => {
      state.issues = state.issues.map((issue) => {
        if (issue.id === action.payload.id) {
          return {
            ...issue,
            title: action.payload.title,
            state: action.payload.state,
            url: action.payload.url || '',
            createdAt: action.payload.createdAt || new Date().toISOString(),
            updatedAt: action.payload.updatedAt || new Date().toISOString(),
          }
        }
        return issue
      })
    },
    resetIssues: (state) => {
      state.issues = issues
    },
    sortIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    },
  },
})

export const selectFilteredIssues = (state: RootState) => {
  return state.issue.issues.filter((issue) => {
    const searchText = `${issue.id} ${issue.title} ${issue.url} ${issue.createdAt}`.toLowerCase()
    return searchText.includes(state.issue.filter.toLowerCase())
  })
}

export const { addIssue, deleteIssue, editIssue, resetIssues, sortIssues, setFilter } = issueSlice.actions

export default issueSlice.reducer
