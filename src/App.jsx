import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Login from './routes/Login/Login'
import Register from './routes/Register/Register'
import Recovery from './routes/Recovery/Recovery'
import Navigation from './routes/Navigation/Navigation'
import Home from './routes/Home/Home'
import Login2 from './components/Login2'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login2 />} />
          <Route path='/register' element={<Register />} />
          <Route path='/recovery' element={<Recovery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
