import React, { useState, useEffect } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import jwt from "jsonwebtoken";
import './App.css'


function App() {

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true })
      const dateNow = Date.now() / 1000

      if (decodedToken.payload.exp < dateNow) {
        localStorage.removeItem("token")
      } else {
        alert("decodec token time left : ", decodedToken.payload.exp)
      }
    }

  }, [])

  const [flag, setFlag] = useState(true)

  return (
    <div className="App">
      {flag ? <Register setFlag={setFlag} /> : <Login setFlag={setFlag} />}
    </div>
  );
}

export default App;
