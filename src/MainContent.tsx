import { Box } from '@mui/material'
import { AntsGameComponent } from 'ants-game-component'

function MainContent() {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'hidden',
        bgcolor: 'common.white',
      }}
    >
      <AntsGameComponent assetsBaseUrl="/ants-game-component-assets/" />
    </Box>
  )
}

export default MainContent
