import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { resetIssues } from '../features/issueSlice'

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Final
          </Typography>
          <Typography variant="body1" component="div" color="inherit">
            Reload data:
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="refresh"
            onClick={() => dispatch(resetIssues())}
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
