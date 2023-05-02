import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Issue } from '../../types/issue'
import { useDispatch } from 'react-redux'
import { deleteIssue } from '../features/issueSlice'
import { AppDispatch } from '../store'

interface DeleteConfirmationDialogProps {
  issue?: Issue
  open: boolean
  handleClose: () => void
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ issue, open, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    if (issue) {
      dispatch(deleteIssue(issue))
    }
    handleClose()
  }

  const renderIssueContent = (label: string, value: string | number | undefined) => (
    <DialogContentText>
      {label}: {value} <br />
    </DialogContentText>
  )

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        {renderIssueContent('Id', issue?.id)}
        {renderIssueContent('Title', issue?.title)}
        {renderIssueContent('State', issue?.state)}
        {renderIssueContent('Url', issue?.url)}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'start' }}>
        <Button onClick={handleDelete} sx={{ textTransform: 'none', color: 'black' }}>
          Delete
        </Button>
        <Button onClick={handleClose} sx={{ textTransform: 'none', color: 'black' }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmationDialog
