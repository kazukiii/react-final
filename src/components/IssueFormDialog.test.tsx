import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import IssueFormDialog from './IssueFormDialog'
import { issueSlice } from '../features/issueSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    issues: issueSlice.reducer,
  },
})

const defaultProps = {
  isNew: true,
  open: true,
  handleClose: jest.fn(),
}

describe('IssueFormDialog component', () => {
  test('shows the correct title when dialog is opened', () => {
    render(
      <Provider store={store}>
        <IssueFormDialog {...defaultProps} />
      </Provider>
    )
    expect(screen.getByText('Add new Issue')).toBeInTheDocument()
  })

  test('shows the correct title when dialog is opened for editing', () => {
    render(
      <Provider store={store}>
        <IssueFormDialog
          {...defaultProps}
          isNew={false}
          issue={{
            id: '1',
            title: 'test',
            state: 'open',
            url: 'https://github.com',
            createdAt: '2021-10-10T10:10:10Z',
            updatedAt: '2021-10-10T10:10:10Z',
          }}
        />
      </Provider>
    )
    expect(screen.getByText('Issue id: 1')).toBeInTheDocument()
  })
})
