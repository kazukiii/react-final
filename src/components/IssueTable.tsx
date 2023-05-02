import React, { useState, ChangeEvent } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import TableSortLabel from '@mui/material/TableSortLabel'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSelector, useDispatch } from 'react-redux'
import orderBy from 'lodash/orderBy'
import { RootState, AppDispatch } from '../store'
import IssueFormDialog from './IssueFormDialog'
import { Issue } from '../../types/issue'
import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import { sortIssues, selectFilteredIssues } from '../features/issueSlice'

type Order = 'asc' | 'desc'

interface Column {
  id: 'id' | 'title' | 'state' | 'url' | 'createdAt' | 'updatedAt'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id' },
  { id: 'title', label: 'Title' },
  { id: 'state', label: 'State' },
  { id: 'url', label: 'Url' },
  { id: 'createdAt', label: 'Created at' },
  { id: 'updatedAt', label: 'Updated at' },
]

const IssueTable: React.FC = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [open, setOpen] = useState(false)
  const [isNew, setIsNew] = useState(true)
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>(undefined)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [issueToDelete, setIssueToDelete] = useState<Issue | undefined>(undefined)
  const [order, setOrder] = useState<Order>('asc')
  const [sortKey, setSortKey] = useState<keyof Issue>()
  const issues = useSelector((state: RootState) => state.issue.issues)
  const dispatch = useDispatch<AppDispatch>()
  const filteredIssues = useSelector(selectFilteredIssues)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const displayedColumns = isMobile ? columns.filter((column) => ['title', 'state'].includes(column.id)) : columns

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleAddClick = () => {
    setIsNew(true)
    setOpen(true)
  }

  const handleEditClick = (row: Issue) => {
    setSelectedIssue(row)
    setIsNew(false)
    setOpen(true)
  }

  const handleDeleteClick = (row: Issue) => {
    setIssueToDelete(row)
    setDeleteDialogOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false)
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Issue) => {
    const isAsc = sortKey === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setSortKey(property)
    const sortedIssues = orderBy(issues, [property], [isAsc ? 'desc' : 'asc'])
    dispatch(sortIssues(sortedIssues))
  }

  const createSortHandler = (property: keyof Issue) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property)
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {displayedColumns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    <TableSortLabel
                      active={sortKey === column.id}
                      direction={sortKey === column.id ? order : 'asc'}
                      onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={handleAddClick}>
                    <AddIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIssues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {displayedColumns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(row)}>
                        <EditIcon sx={{ color: 'red' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(row)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={issues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <IssueFormDialog isNew={isNew} issue={isNew ? undefined : selectedIssue} open={open} handleClose={handleClose} />
      <DeleteConfirmationDialog issue={issueToDelete} open={deleteDialogOpen} handleClose={handleDeleteClose} />
    </>
  )
}

export default IssueTable
