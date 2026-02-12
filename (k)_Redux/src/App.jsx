import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Product from './components/Product'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Product/>
    </>
  )
}

export default App
