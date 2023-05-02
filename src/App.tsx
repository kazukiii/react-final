import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Header from './components/Header'
import IssuesFilter from './components/IssueFilter'
import IssueTable from './components/IssueTable'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <IssuesFilter />
      <IssueTable />
    </ThemeProvider>
  )
}

export default App
