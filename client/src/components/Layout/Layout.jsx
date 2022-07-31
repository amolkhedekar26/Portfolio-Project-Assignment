import React from 'react'
import { MyRoutes } from '../Routes'
import { Sidebar } from '../Sidebar'

function Layout() {
    const layoutStyle={
        display: 'flex',
    }
  return (
    <div style={layoutStyle}>
        <MyRoutes />
    </div>
  )
}

export default Layout