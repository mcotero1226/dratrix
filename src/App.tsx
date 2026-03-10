import {AppRouter} from './routes/routes'
import { AppRouterPublico } from './routes/routespublico'
function App() {
  const users=localStorage.getItem('users')
  

  return (
    <>
    {
      users ? <AppRouter/> : <AppRouterPublico/>
    }
    </>
  )
}

export default App
