import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Home, Video, Images } from './components'


const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='image/:func' element={<Images />} />
        <Route path='video' element={<Video />} />
      </Route>
    </Routes>
  )
}

export default App