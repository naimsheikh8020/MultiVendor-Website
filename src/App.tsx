import { BrowserRouter, useRoutes } from "react-router"
import { routes } from "./Routes/Router"
import { Toaster } from 'react-hot-toast'

const AppRoutes = () => {
  return useRoutes(routes);
}

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
