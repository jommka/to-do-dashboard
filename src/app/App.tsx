import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./providers/router/ui/AppRouter.tsx";

function App() {

  return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
  )
}

export default App
