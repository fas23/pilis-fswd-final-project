import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './routes/Login'
import Register from './routes/Register'
import Recovery from './routes/Recovery'
// import Navigation from './routes/Navigation/Navigation2'
import Home from './routes/Home/Home'
import { Navigation } from './routes/Navigation/Navigation'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/recovery' element={<Recovery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
