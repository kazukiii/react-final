import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import { setFilter } from '../features/issueSlice'
import { RootState } from '../store'
import Box from '@mui/material/Box'

const IssueFilter: React.FC = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state: RootState) => state.issue.filter)

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <Box margin={3}>
      <TextField
        label="Filter issues"
        value={filter}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
        variant="standard"
      />
    </Box>
  )
}

export default IssueFilter
