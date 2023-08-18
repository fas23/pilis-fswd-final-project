import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './routes/Login/Login'
import Register from './routes/Register/Register'
import Recovery from './routes/Recovery/Recovery'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
