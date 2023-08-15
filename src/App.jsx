import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './routes/Home/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
          {<Routes>
           {/*  <Route path='/' element={<Navigation/>}> */}
              <Route path='/' element={<Home/>}/>
              {/* <Route path='login' element={<Login/>}/> */}
            {/* </Route> */}
          </Routes>}
    </div>
  )
}

export default App
