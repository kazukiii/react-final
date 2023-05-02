import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import IssueFilter from './IssueFilter'
import { store } from '../store'

describe('IssueFilter component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <IssueFilter />
      </Provider>
    )
  })

  test('renders the filter text field', () => {
    expect(screen.getByLabelText('Filter issues')).toBeInTheDocument()
  })

  test('filter input works correctly', () => {
    const filterInput = screen.getByLabelText('Filter issues')
    fireEvent.change(filterInput, { target: { value: 'test filter' } })
    expect(filterInput).toHaveValue('test filter')
  })
})
