import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormHelperText from '@mui/material/FormHelperText'
import { useDispatch } from 'react-redux'
import { validationSchema } from '../utils/validationSchema'
import { IssueForm, Issue } from '../../types/issue'
import { addIssue, editIssue } from '../features/issueSlice'
import { AppDispatch } from '../store'

interface IssueFormDialogProps {
  isNew: boolean
  issue?: Issue
  open: boolean
  handleClose: () => void
}

const IssueFormDialog: React.FC<IssueFormDialogProps> = ({ isNew, issue, open, handleClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IssueForm>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
    defaultValues: issue,
  })
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (open) {
      reset(isNew ? {} : issue)
    }
  }, [open, isNew, issue, reset])

  const onSubmit = (data: IssueForm) => {
    if (isNew) {
      dispatch(addIssue(data))
    } else {
      dispatch(editIssue(data))
    }
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{isNew ? 'Add new Issue' : `Issue id: ${issue?.id}`}</DialogTitle>
          <DialogContent>
            <TextField
              {...register('id')}
              autoFocus
              margin="dense"
              label="Id *"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.id}
              helperText={errors.id?.message}
            />
            <TextField
              {...register('title')}
              margin="dense"
              label="Title *"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.title}
              helperText={errors.title?.message}
              multiline
            />
            <TextField
              {...register('state')}
              margin="dense"
              label="State *"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.state}
              inputProps={{ maxLength: 10 }}
            />
            {errors.state ? (
              <FormHelperText error={!!errors.state}>{errors.state?.message}</FormHelperText>
            ) : (
              <FormHelperText sx={{ textAlign: 'end' }}>
                {watch('state') && `${watch('state').length}/10`}
              </FormHelperText>
            )}
            <TextField
              {...register('url')}
              margin="dense"
              label="Url"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.url}
              helperText={errors.url?.message}
            />
            <TextField
              {...register('createdAt')}
              margin="dense"
              label="Created At"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.createdAt}
              helperText={errors.createdAt?.message}
            />
            <TextField
              {...register('updatedAt')}
              margin="dense"
              label="Updated At"
              type="text"
              fullWidth
              variant="standard"
              error={!!errors.updatedAt}
              helperText={errors.updatedAt?.message}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'start' }}>
            <Button type="submit" disabled={!isValid} sx={{ textTransform: 'none', color: 'black' }}>
              Save
            </Button>
            <Button onClick={handleClose} sx={{ textTransform: 'none', color: 'black' }}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default IssueFormDialog
