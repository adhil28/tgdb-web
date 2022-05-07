import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'

function App() {
    return (
        <div>
            <Layout />
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>

        </div>
    )
}

export default App