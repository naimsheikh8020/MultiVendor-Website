import { BrowserRouter, useRoutes } from "react-router"
import { routes } from "./Routes/Router"

const AppRoutes = () => {
  return useRoutes(routes);
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
