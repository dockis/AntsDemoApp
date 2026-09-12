import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'

type NavValue = 'edukace' | 'audio' | 'hra'

interface BottomNavProps {
  value: NavValue
  onChange: (value: NavValue) => void
}

function BottomNav({ value, onChange }: BottomNavProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        pb: 'env(safe-area-inset-bottom)',
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(_event, newValue: NavValue) => onChange(newValue)}
      >
        <BottomNavigationAction
          label="Edukace"
          value="edukace"
          icon={<SchoolIcon />}
        />
        <BottomNavigationAction
          label="Audio"
          value="audio"
          icon={<HeadphonesIcon />}
        />
        <BottomNavigationAction
          label="Hra"
          value="hra"
          icon={<SportsEsportsIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}

export type { NavValue }
export default BottomNav
