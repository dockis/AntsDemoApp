import { useState } from 'react'
import { Box } from '@mui/material'
import TopAppBar from './TopAppBar'
import MainContent from './MainContent'
import BottomNav, { type NavValue } from './BottomNav'

function App() {
  const [selectedNav, setSelectedNav] = useState<NavValue>('edukace')

  return (
    <Box
      sx={{
        height: '100dvh',
        maxWidth: 480,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'common.white',
        pl: 'env(safe-area-inset-left)',
        pr: 'env(safe-area-inset-right)',
      }}
    >
      <TopAppBar />
      <MainContent />
      <BottomNav value={selectedNav} onChange={setSelectedNav} />
    </Box>
  )
}

export default App
