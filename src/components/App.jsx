import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import '../index.css'
import Header from './Header.jsx'

function App() {

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
