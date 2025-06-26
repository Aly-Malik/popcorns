import React from 'react'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
    <Navbar/>
     <main className="p-4">
        <Outlet /> {/* This renders the matched child route */}
      </main>
    </>
  )
}

export default Layout
