import { NotificationProvider } from './context/notificationsContext'
import { ThemeProvider } from './context/themeContex'
import { AppRoutes } from './routes/AppRoutes'
import { ClearStorage } from './utils/ClearStorage'

function App() {
  return (
    <ThemeProvider>
      <ClearStorage />
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App
