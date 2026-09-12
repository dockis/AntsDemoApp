import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface MainContentProps {
  children?: ReactNode
}

function MainContent({ children }: MainContentProps) {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        bgcolor: 'common.white',
      }}
    >
      {children}
    </Box>
  )
}

export default MainContent
