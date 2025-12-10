import { ThemeProvider } from './context/themeContex'
import { AppRoutes } from './routes/AppRoutes'
import { ClearStorage } from './utils/ClearStorage'

function App() {
  return (
    <ThemeProvider>
      <ClearStorage />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
