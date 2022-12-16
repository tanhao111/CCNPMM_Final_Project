import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home, Webcam, Images } from './components'


const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='image/:func' element={<Images />} />
        <Route path='webcam' element={<Webcam />} />
      </Route>
    </Routes>
  )
}

export default App