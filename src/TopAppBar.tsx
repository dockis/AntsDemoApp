import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

function TopAppBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        pt: 'env(safe-area-inset-top)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            color: 'common.white',
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          Wappka
        </Typography>

        <IconButton
          sx={{
            bgcolor: 'primary.light',
            color: 'common.white',
          }}
        >
          <PersonRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopAppBar
