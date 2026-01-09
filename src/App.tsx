import { NotificationProvider } from './context/notificationsContext'
import { ThemeProvider } from './context/themeContex'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App
