import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import issueSlice from '../features/issueSlice'
import IssueTable from './IssueTable'
import { Issue } from '../../types/issue'

const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Test Issue 1',
    state: 'open',
    url: 'https://example.com/test1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Test Issue 2',
    state: 'closed',
    url: 'https://example.com/test2',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z',
  },
]

const store = configureStore({
  reducer: {
    issue: issueSlice,
  },
  preloadedState: {
    issue: { issues: mockIssues, filter: '' },
  },
})

const renderWithRedux = (component: React.ReactElement) => {
  const theme = createTheme()

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </Provider>
    ),
    store,
  }
}

describe('IssueTable component', () => {
  test('renders the table headers correctly', () => {
    renderWithRedux(<IssueTable />)

    expect(screen.getByText('Id')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('State')).toBeInTheDocument()
    expect(screen.getByText('Url')).toBeInTheDocument()
    expect(screen.getByText('Created at')).toBeInTheDocument()
    expect(screen.getByText('Updated at')).toBeInTheDocument()
  })

  test('renders the issues in the table', () => {
    renderWithRedux(<IssueTable />)

    expect(screen.getByText('Test Issue 1')).toBeInTheDocument()
    expect(screen.getByText('open')).toBeInTheDocument()
    expect(screen.getByText('Test Issue 2')).toBeInTheDocument()
    expect(screen.getByText('closed')).toBeInTheDocument()
  })
})
