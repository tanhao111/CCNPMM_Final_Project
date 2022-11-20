import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [msg, setMsg] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3003/api").then((res) => {
      setMsg(res.data.msg)
      console.log(res)
    }).catch((err) => console.log(err))
  }, [])

  if (!msg ) return <p>No Message</p>
  return(
    <div className='app'>
      <h1>this is message {msg}</h1>
    </div>
  )
}

export default App